const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'projeto',
    port: '3306',
    password: 'projetomba',
    database: 'projetomba',
    multipleStatements: true
});

connection.connect(function(err){
    if (err) {
        console.error(err);
        return; 
      } else {
        console.log('Conectado na base de dados!');
      }
    });

module.exports = connection;
 
