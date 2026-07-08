//server.js solo debe conectar todo sin hacer la logica de las rutas
//Enciende la APP+ conecta DB+ abre servidor 

const express = require('express');
const app = express();
require('dotenv').config();

//Importamos rutas de contactos y la conexion a la base de datos
const contactsRoutes = require('./routes/contacts');
const { initDb } = require('./config/database');

const port= process.env.PORT || 3000;

//---MIDDLEWARES----
//con esto permitimos a express a entender json en el body de las peticiones
app.use(express.json());
//Todo lo que este dentro de este router empezara con /contacts, por ejemplo: GET /contacts, POST /contacts, GET /contacts/:id, etc.
app.use('/contacts', contactsRoutes);

//---RUTAS---- Esto pertenece a app el servidor principal, no al router de contactos 
app.get('/', (req, res) => { //app.get ('/') responde a hppt://localhost:3000/ con un mensaje de bienvenida
  res.send('Welcome to the Contacts API');
}); //podriamos quitar esto y mi API seguiria funcionando 

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