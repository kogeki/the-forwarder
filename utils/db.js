const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  database: "grabber",
  user: "<username>",
  password: "<password>",
});

conn.connect((err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Connected to database!");
});

module.exports = conn;
