const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'127.0.0.1',//数据库地址
    user:'root',//账号
    password:'123456',//数据库密码
    database:'app_api'//数据库名称
});
connection.connect();
module.exports = connection;