const jwt = require("jsonwebtoken");

const validate = (req, res, next) => {
  const encoded_jwt = req.headers.authorization;

  if (!encoded_jwt) {
    res.json({ msg: "no token provided" });
  } else {
    const jwt_token = encoded_jwt.split(" ")[1];
    try {
      const decoded = jwt.verify(jwt_token, process.env.JWT_SECRET);

      res.json({ username: decoded.username, admin: decoded.admin });
    } catch (err) {
      res.json({ msg: err.message });
    }
  }
};

module.exports = validate;
