const { json } = require("body-parser");

const db = require("../../../db/connection");

const login = async (req, res) => {
  var user_email = req.body.email;
  var user_password = req.body.password;

  const result = await db.query(
    `SELECT email,password from user WHERE email='${user_email}'`
  );

  const email = result[0][0].email;
  const password = result[0][0].password;

  if (email === user_email && password === user_password) {
    res.status(200).json({
      status: "success",
      message: "login successfully",
    });
  }

  res.end();
};

module.exports = login;
