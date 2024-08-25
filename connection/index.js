const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'root',
    password: 'my-secret-pw',
    database: 'local'
}

const connection = function() {
    const connect = mysql.createConnection(config);

    connect.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
            return {
                error: 'Db is not connected'
            };
        }
        console.log('Connected');
    });

    return connect;
}

module.exports.connection = connection;
