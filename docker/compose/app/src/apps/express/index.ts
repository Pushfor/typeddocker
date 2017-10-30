import * as debug from "debug";
import * as forever from "forever-monitor";

const logger = debug("typeddocker.forever");

logger("setting up");

const child = new (forever.Monitor)(__dirname + "/server.js", {
  args: [],
  max: 3,
  silent: false,
  watch: true,
  watchDirectory: __dirname,
});

child.on("exit", () => {
  logger("server.js has exited after 3 restarts");
});

child.start();

logger("started");
