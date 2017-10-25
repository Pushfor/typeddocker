import * as forever from "forever-monitor";

const child = new (forever.Monitor)(__dirname + "/server.js", {
  args: [],
  max: 3,
  silent: true,
  watch: true,
  watchDirectory: __dirname,
});

child.on("exit", () => {
  // console.log("server.js has exited after 3 restarts");
});

child.start();
