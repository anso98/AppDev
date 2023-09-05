const mysql = require('mysql2');
require('dotenv').config();

const mySQLPassword = process.env.mySQLPassword;
const databaseName = process.env.NODE_ENV === 'test' ? 'appUsers1_testbase' : 'appUsers1';

console.log(databaseName);

let db_con  = mysql.createPool({
    host: "localhost",
    user: "root",
    password: mySQLPassword,
    database: databaseName,
    authSwitchHandler: (data, cb) => {
        if (data.pluginName === 'caching_sha2_password') {
          const password = mySQLPassword; // Set your actual password
          const passwordBuffer = Buffer.from(password + '\0');
          cb(null, passwordBuffer);
        }
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0  
});

/*let connection = db_con.connect((err) => {
    if (err) {
        console.log("Database Connection Failed !!!", err);
      } else {
        console.log("connected to Database");
      }
})*/
  
module.exports = db_con.promise();
;