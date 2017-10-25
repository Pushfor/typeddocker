import * as express from "express";
import * as fs from "fs";
import * as morgan from "morgan";

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

app.get("/hello", (req, res) => res.send("hi there"));

app.listen(PORT, HOST);
