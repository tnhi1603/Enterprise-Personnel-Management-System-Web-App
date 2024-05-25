const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '123456', 
    database: 'myWebApp'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
    } else {
        console.log('Connected to the database.');
    }
});

module.exports = db;
