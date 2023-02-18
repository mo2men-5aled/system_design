const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "auth",
  "root",
  "Mo2men@2468",
  // process.env.MYSQL_DB,
  // process.env.MYSQL_USER,
  // process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  }
);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

module.exports = sequelize;
