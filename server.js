//server.js solo debe conectar todo sin hacer la logica de las rutas
//Enciende la APP+ conecta DB+ abre servidor 

const express = require('express');
const app = express();
require('dotenv').config();

const contactsRoutes = require('./routes/contacts');
const { initDb } = require('./config/database');


const port= process.env.PORT || 3000;

app.use(express.json());

app.use('/contacts', contactsRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Contacts API');
});

//CONEXION A MONGODB
//aqui es donde ocurre la conexion a mongodb antes de levantar el servidor 
initDb((err) => {
  if (err) {
    console.error('Failed to initialize database', err);}
    else {
    app.listen(port, () => { //Aqui mi backend “empieza a vivir”.
      console.log(`Server is running on port ${port}`);
    });
  }
});