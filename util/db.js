const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;

// const mysql = require('mysql2');
//
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-complete',
//     password: ''
// }); // Pool of connections
//
// module.exports = pool.promise();