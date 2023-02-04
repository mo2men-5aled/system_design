const jwt = require("jsonwebtoken");

const validate = (req, res) => {
  const encoded_jwt = req.headers.authorization;
  if (encoded_jwt) {
    const jwt_token = encoded_jwt.split(" ")[1];
    jwt.verify(jwt_token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ msg: "Invalid Token" });
      } else {
        res.status(200).json({ msg: "Valid Token", decoded });
      }
    });
  } else {
    res.status(401).json({ msg: "Invalid Token" });
  }
};

module.exports = validate;
