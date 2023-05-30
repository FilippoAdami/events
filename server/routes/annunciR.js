const express = require('express');
const router = express.Router();
const Annuncio = require('../models/annuncioM.js');
const tokenChecker = require('../controllers/tokenChecker.js');

//API to post a new annuncio (updated with tokenChecker)
router.post('/annunci', tokenChecker, async (req, res) => {
  try {
    const annuncioData = req.body;
    const utenteLoggato = req.utenteLoggato;
    annuncioData.id_publisher = utenteLoggato.id;

    const annuncio = new Annuncio(annuncioData);
    await annuncio.save();
    res.status(201).send(annuncio);
  } catch (error) {
    res.status(400).send(JSON.stringify(error.message));
  }
});

//Get all annunci (doesn't require authentication)
router.get('/annunci', async (req, res) => {
  try {
    const annunci = await Annuncio.find();
    res.json(annunci);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// API to GET an annuncio given its id (doesn't require authentication)
router.get('/annunci/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const annuncio = await Annuncio.findById(req.params.id);
    //console.log(annuncio);
    if (!annuncio) {
      return res.status(404).send('Annuncio not found');
    }
    res.json(annuncio);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

//function to get the infos of a specific annuncio given its id
async function getAnnuncio(req, res, next) {
  let annuncio
  try {
    annuncio = await Annuncio.findById(req.params.id)
    console.log(annuncio);
    if (annuncio == null) {
      return res.status(404).send('Annuncio non trovato')
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('errore al server in getAnnuncio')
  }
  res.annuncio = annuncio
  next()
}

// API to GET all the annunci published by a specific publisher (updated with tokenChecker)
router.get('/annunci/publisher/:publisher_id', tokenChecker, async (req, res) => {
  try {
    const publisherId = req.params.publisher_id;
    const utenteLoggato = req.utenteLoggato;

    // Check if the publisher_id matches the ID of the logged-in user
    if (publisherId !== utenteLoggato.id) {
      console.log(utenteLoggato.id + ' ' + publisherId  );
      return res.status(403).send('Unauthorized access' );
      
    }

    const annunci = await Annuncio.find({ id_publisher: publisherId });

    res.json(annunci);
  } catch (error) {
    //console.log(error.message);
    res.status(500).send(error.message);
  }
});

// API to DELETE an annuncio given its id (updated with tokenChecker)
router.delete('/annunci/:id', getAnnuncio, tokenChecker, async (req, res) => {
  try {
    const utenteLoggato = req.utenteLoggato;
    const annuncio = res.annuncio;
    // Check if the publisher_id matches the ID of the logged-in user
    if (annuncio.id_publisher !== utenteLoggato.id) {
      return res.status(403).send('Unauthorized access');
    }
    console.log(annuncio);

    annuncio.deleteOne();

    res.send('Annuncio deleted successfully');
  } catch (error) {
    console.log(error.message);
    res.status(500).send('errore al server in delete annuncio');
  }
});
 
// API to update an annuncio given its id (updated with tokenChecker)
router.patch('/annunci/:id', getAnnuncio, tokenChecker, async (req, res) => {
  try {
    const utenteLoggato = req.utenteLoggato;
    const annuncio = res.annuncio;

    // Check if the publisher_id matches the ID of the logged-in user
    if (annuncio.id_publisher !== utenteLoggato.id) {
      return res.status(403).send('Unauthorized access');
    }

    // Extract the fields from the request body
    const { id, id_publisher, ...updatedFields } = req.body;

    // Update the remaining fields of the annuncio
    Object.assign(annuncio, updatedFields);

    const annuncioAggiornato = await annuncio.save();

    res.json(annuncioAggiornato);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
  