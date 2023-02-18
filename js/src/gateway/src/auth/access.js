const axios = require("axios");

const token = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!req.headers.authorization) {
    res.json({ msg: "missing credentials" });
  } else {
    if (!token) {
      res.json({ msg: "missing credentials" });
    }

    const response = await axios.post(
      `${process.env.HOSTNAME}/validate`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );

    req.user = response.data;

    next();
  }
};

module.exports = token;
