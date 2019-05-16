const dotenv = require('dotenv').config();

var host = process.env.HOST;
var port = process.env.PORT;
var username = process.env.DB_USER;
var password = process.env.DB_PASSWORD;
var database_name = process.env.DB;
var server_port = process.env.SERVER_PORT;


module.exports = {
    database:{
        host: host,
        port: port,
        user: username,
        password: password,
        name: database_name
    },
    server:{
        port: server_port
    }
}