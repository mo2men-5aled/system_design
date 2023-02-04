const { json } = require("body-parser");

const db = require("../../../db/connection");

const JWT = require("./jwt");

const login = async (req, res) => {
  var user_email = req.body.email;
  var user_password = req.body.password;

  const result = await db.query(
    `SELECT email,password from user WHERE email='${user_email}' AND password='${user_password}'`
  );

  if (result[0].length > 0) {
    const email = result[0][0].email;
    const password = result[0][0].password;

    if (user_email == email && user_password == password) {
      return JWT(email);
    } else {
      res.status(400).json({ msg: "Invalid Credeentials" });
    }
  } else {
    res.status(400).json({ msg: "Invalid Credeentials" });
  }
};

module.exports = login;
