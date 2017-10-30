import * as  electron from "electron";
import { app, autoUpdater, BrowserWindow, dialog, ipcMain, Menu, nativeImage } from "electron";
import * as os from "os";
import { join } from "path";

let win: any;

const UPDATESERVER: string = null;

const image = nativeImage.createFromPath(`file://${__dirname}/assets/icon/apple-icon-76x76.png`);
image.setTemplateImage(true);

if (handleSquirrelEvent()) {
    app.quit();
}

function createWindow() {
    let version = "?";

    try {
        version = app.getVersion();
        let osUrl;
        let feedUrl;

        if ("win32" === os.platform()) {
            osUrl = "win" + (os.arch() === "x64" ? "64" : "32");
        } else if ("darwin" === os.platform()) {
            osUrl = "osx_64";
        }

        feedUrl = UPDATESERVER + osUrl + "/" +
            version + "/" + (version.match(/-alpha/) ? "alpha" : "stable");

        autoUpdater.setFeedURL(feedUrl);

        autoUpdater
            .addListener("update-downloaded" as "update-not-available",
            (event: Event, releaseNotes: string, releaseName: string, releaseDate: string) => {
                dialog.showMessageBox({
                    buttons: ["OK"],
                    message: releaseName,
                    title: "Debug",
                });
                win.webContents.send("update-downloaded", { event, releaseNotes, releaseName, releaseDate });
            });

        autoUpdater.addListener("error" as "update-not-available", (error: Event) => {
            // TBD
        });
    } catch (e) {
        if (e.message === "Could not get code signature for running application") {
            // app.exit();
            // return;
        } else {
            dialog.showMessageBox({
                buttons: ["OK"],
                message: e.message,
                title: "Error while checking updates",
            });
        }
    }
    // Create the browser window.
    const bounds = electron.screen.getDisplayNearestPoint(electron.screen.getCursorScreenPoint()).workArea;
    win = new BrowserWindow({
        height: 600,
        icon: image,
        width: 400,
        x: Math.floor(bounds.x + (bounds.width - 400)),
        y: Math.floor(bounds.height - (600 - bounds.y)),
    });

    // and load the index.html of the app.
    win.loadURL(`file://${__dirname}/index.html`);

    win.setTitle("Title");

    // Emitted when the window is closed.
    win.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });

    const menu = Menu.buildFromTemplate([
        {
            label: "TypedDocker",
            submenu: [
                {
                    click: () => dialog.showMessageBox({
                        buttons: ["OK"],
                        message: "Hello world!",
                        title: "TypedDocker",
                    }),
                    label: "About TypedDocker " + version,
                },
            ],
        },
    ]);
    Menu.setApplicationMenu(menu);
}

function handleSquirrelEvent() {
    if (process.argv.length === 1) {
        return false;
    }

    const ChildProcess = require("child_process");
    const path = require("path");

    const appFolder = path.resolve(process.execPath, "..");
    const rootAtomFolder = path.resolve(appFolder, "..");
    const updateDotExe = path.resolve(path.join(rootAtomFolder, "Update.exe"));
    const exeName = path.basename(process.execPath);

    const spawn = (command, args) => {
        let spawnedProcess;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, { detached: true });
        } catch (error) {
            // NOOP
        }

        return spawnedProcess;
    };

    const spawnUpdate = (args) => {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case "--squirrel-install":
        case "--squirrel-updated":
            // Optionally do things such as:
            // - Add your .exe to the PATH
            // - Write to the registry for things like file associations and
            //   explorer context menus

            // Install desktop and start menu shortcuts
            spawnUpdate(["--createShortcut", exeName]);

            setTimeout(app.quit, 1000);
            return true;

        case "--squirrel-uninstall":
            // Undo anything you did in the --squirrel-install and
            // --squirrel-updated handlers

            // Remove desktop and start menu shortcuts
            spawnUpdate(["--removeShortcut", exeName]);

            setTimeout(app.quit, 1000);
            return true;

        case "--squirrel-obsolete":
            // This is called on the outgoing version of your app before
            // we update to the new version - it"s the opposite of
            // --squirrel-updated

            app.quit();
            return true;
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
    createWindow();
    autoUpdater.checkForUpdates();
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
    win = null;
});

app.on("activate", () => {
    // On macOS it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

// ipcMain.on("set-badge", (event, count) => app.setBadgeCount(count));

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on("quit-and-install", (event, arg) => {
    autoUpdater.quitAndInstall();
});
