//aqui van dos endpoints GET    
const express = require('express'); //importa express
const router = express.Router();// creamos un router
const { ObjectId } = require('mongodb');
const { getDb } = require('../config/database');

// GET todos los contactos
router.get('/', async (req, res) => {
  try {
    const db = getDb(); //Esto solo funciona porque hice initDb() en server.js antes de levantar el servidor
    const contacts = await db.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET un solo contacto por id
router.get('/:id', async (req, res) => {
  try {
    const db = getDb();
    const contactId = new ObjectId(req.params.id);
    const contact = await db.collection('contacts').findOne({ _id: contactId });
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new contact
router.post ('/', async (req, res) => {
  //1 sacar los datos del body, esto se llama desestructuracion en Js 
  const {firstName, lastName, email, favoriteColor, birthday } = req.body;
  //2 Validar que todos los campos existan 
  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ error: 'All fields are required'});
  }

  try {
    const db = getDb(); 
    const result = await db.collection("contacts").insertOne({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    });
    res.status(201).json(result);
  }catch(err){
    res.status(500).json({ error: err.message });
  }
});

// PUT update contact by id
//Cuando haces PUT usualmente debes responder dos preguntas:
router.put('/:id', async (req, res) =>{
  try {
    const db= getDb();
    //que contacto quiero actualizar? 
    const contactId= req.params.id;
    //con que datos actualizarlo?
    const updatedContact= req.body; 

    const result= await db.collection("contacts").updateOne(
      { _id: new ObjectId(contactId) },
      { $set: updatedContact }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } 
});

// DELETE contact by id
router.delete('/:id', async (req, res) => {
  try {
    const db = getDb();
    const contactId = new ObjectId(req.params.id);
    const result = await db.collection("contacts").deleteOne({ _id: contactId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;