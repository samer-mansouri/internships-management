// Import the createConnection method from TypeORM
const { createConnection } = require("typeorm");

const { MYSQL_DATABASE, MYSQL_PASSWORD, MYSQL_USER } = process.env;

const User = require('../models/User');
const DemandeDeStage = require('../models/DemandeDeStage');
const SujetDeStage = require('../models/SujetDeStage');
const Document = require('../models/Document');
// Create a connection to the database
exports.connect = () => {

    createConnection({
        type: "mysql", // Type of the database
        host: "localhost", // Host where the database is running
        port: 3306, // Database port
        username: MYSQL_USER,// Database username
        password: MYSQL_PASSWORD, // Database password
        database: MYSQL_DATABASE , // Database name
        entities: [
          // Specify your entities here
            User,
            DemandeDeStage,
            SujetDeStage,
            Document
        ],
        synchronize: true, // Automatically creates the database schema
      }).then(() => {
        //.then((connection) => {)
        // Here you can start to work with your entities
        console.log("Connection established with success");
      }).catch(error => {
        console.log(error);
        process.exit(1);
      });
      
    
}

