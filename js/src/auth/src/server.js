const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());
const login = require("./login");

const validate = require("./validate");

//app routes
app.post("/login", login);

app.post("/validate", validate);

//app host
const port = process.env.PORT;
app.listen(port, "0.0.0.0", () => {
  console.log("Server is running on port " + port);
});
