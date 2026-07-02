//server.js solo debe conectar todo sin hacer la logica de las rutas 
const express = require('express');
const app = express();
require('dotenv').config();

const contactsRoutes = require('./routes/contacts');
const { initDb } = require('./config/database');


const port= process.env.PORT || 3000;


app.use('/contacts', contactsRoutes);

app.use('/', (req, res) => {
  res.send('Welcome to the Contacts API');
});

initDb((err) => {
  if (err) {
    console.error('Failed to initialize database', err);}
    else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});