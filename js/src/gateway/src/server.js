const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const login = require("./auth_svc/access");
const token = require("./auth/access");
const upload = require("./upload");

const publishMessage = require("./rabbitmq/producer");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", token, upload);

app.post("/login", login);

app.post("/sendLog", (req, res) => {
  publishMessage(req.body.logType, req.body.message);
  res.send();
});

app.listen(4000, () => {
  console.log("Server is running on port " + 4000);
});
