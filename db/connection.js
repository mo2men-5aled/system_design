const Sequelize = require("sequelize");
const sequelize = new Sequelize("auth", "root", "Mo2men@2468", {
  host: process.env.MYSQL_HOST,
  dialect: "mysql",
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

module.exports = sequelize;

// var mysql = require("mysql");

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Mo2men@2468",
//   database: "auth",
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// module.exports = con;
