const axios = require("axios");

const login = async (req, res) => {
  const auth = req.headers.authorization;
  if (auth) {
    const base64Credentials = auth.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );
    const [username, password] = credentials.split(":");
    basic_auth = {
      email: username,
      password: password,
    };

    const response = await axios.post(
      `${process.env.HOSTNAME}/login`,
      basic_auth
    );

    if (response.status === 200) {
      res.status(200).send(response.data);
    } else {
      res.status(400).send(response);
    }
  }
};

module.exports = login;
