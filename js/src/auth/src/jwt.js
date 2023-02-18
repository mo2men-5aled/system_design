const jwt = require("jsonwebtoken");

const createToken = (email, secret, authz) => {
  return jwt.sign({ username: email, admin: authz }, secret, {
    expiresIn: "1h",
  });
};

module.exports = createToken;
