const express = require("express");
require("dotenv").config();
var bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const login = require("./js/src/auth/login");
const validate = require("./js/src/auth/validate");

//app routes
app.post("/login", login);

app.post("/validate", validate);

app.get("/", (req, res) => {
  res.send("Hello World");
});

//app host
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("Server is running on port " + process.env.PORT);
});
