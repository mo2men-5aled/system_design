const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.json());

const login = require("./auth_svc/access");
const token = require("./auth/access");
const upload = require("./upload");
const download = require("./download");

app.post("/login", login);

app.post("/upload", token, upload);

// app.get("/download", download);

const port = process.env.PORT;
app.listen(port, "0.0.0.0", () => {
  console.log("Server is running on port " + port);
});
