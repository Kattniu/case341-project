//Manejar la conexion de la base de datos
const { MongoClient } = require('mongodb');
require('dotenv').config();

let database;

// Initialize the database connection

//Explicación rápida: initDb es como "encender" la conexión una sola vez cuando arranca el servidor.
//getDb es como preguntar "dame la conexión que ya está encendida" desde cualquier otra parte de tu app, sin tener que reconectar cada vez.
const initDb = (callback) => {
  if (database) {
    console.log('Db is already initialized!');
    return callback(null, database);
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      database = client.db();
      console.log('conectando a la base de datos', database.databaseName);
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!database) {
    throw Error('Db not initialized');
  }
  return database;
};

module.exports = { initDb, getDb };