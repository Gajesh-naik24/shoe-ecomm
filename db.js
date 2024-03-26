const dotenv = require('dotenv').config()
// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'shoes'
});


const query = async(query, values) => {
    return new Promise((resolve, reject) => {
        connection.query(
            query,
            values,
            function(err, results) {
              if(err) reject(err);
              resolve(results);
                
            }
          );
        
    })
}



module.exports = query;
