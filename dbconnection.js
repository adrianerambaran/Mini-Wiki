var mysql = require('mysql');
var connection = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: "",
  multipleStatements: true
});
module.exports = connection;
