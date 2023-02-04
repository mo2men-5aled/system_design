const db = require("../../../db/connection");

// JWT function
const createToken = require("./jwt");

// Login function
const login = async (req, res) => {
  // Get user email and password from request body
  var user_email = req.body.email;
  var user_password = req.body.password;

  // Query the database to check if the user exists
  const result = await db.query(
    `SELECT email,password from user WHERE email='${user_email}'`
  );

  // Check if the user exists
  if (result[0].length > 0) {
    // Get the user email and password from the database
    const email = result[0][0].email;
    const password = result[0][0].password;

    // Check if the user email and password are correct
    if (user_email == email && user_password == password) {
      res.status(200).json({ token: createToken(email) });
    } else {
      res.status(400).json({ msg: "Invalid Credeentials" });
    }
  } else {
    res.status(400).json({ msg: "Invalid Credeentials" });
  }
};

module.exports = login;
