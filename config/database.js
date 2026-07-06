//Manejar la conexion de la base de datos
const { MongoClient } = require('mongodb');
require('dotenv').config();

//aqui se guarda la conexion para reutilizarla 
let database;

// Initialize the database connection

//Caso 1 ya esta conectado 
//Explicación rápida: initDb es como "encender" la conexión una sola vez cuando arranca el servidor.
const initDb = (callback) => {
  if (database) {
    console.log('Db is already initialized!');
    return callback(null, database);
  }
  //Caso 2 conexion nueva 
  MongoClient.connect(process.env.MONGODB_URI) // se conecta a mongo db 
    .then((client) => {
      database = client.db(); //guarda db en la memoria para reutilizarla
      console.log('conectando a la base de datos', database.databaseName);
      callback(null, database);//dice: "ya está conectado, puedes usar la base de datos"
    })
    .catch((err) => {
      callback(err);
    });
};

//getDb es como preguntar "dame la conexión que ya está encendida" desde cualquier otra parte de tu app, sin tener que reconectar cada vez.
const getDb = () => { //esto es lo que uso en mis rutas
  if (!database) { 
    throw Error('Db not initialized');
  }
  return database; //si todo va bien devuelve la conexion lista 
};

module.exports = { initDb, getDb };