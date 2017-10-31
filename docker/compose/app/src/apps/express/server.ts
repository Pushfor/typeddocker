import * as debug from "debug";
import * as express from "express";
import * as fs from "fs";
import * as morgan from "morgan";
import { update } from "./squirrel/index";

const logger = debug("typeddocker.server");

// Constants
const PORT = 3003;
const HOST = "0.0.0.0";

// App
const app = express();

const BUILD = "./apps/";

app.use(morgan("tiny"));

app.use(express.static("../build/public", {
  index: "index.html",
}));

app.get("/update/:platform", update);

app.get("/hello", (req, res) => res.send("hi there"));

app.listen(PORT, HOST, null, (err) => {
  if (err) {
    logger(err);
    return;
  }
  logger("Running on host + " + HOST + " port " + PORT);
});
