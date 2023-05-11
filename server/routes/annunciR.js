const express = require('express');
const router = express.Router();
const Annuncio = require('../models/annuncioM.js');

//API to post a new annuncio
router.post('/annunci', async (req, res) => {
  try {
    const annuncio = new Annuncio(req.body);
    await annuncio.save();
    res.status(201).send(annuncio);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET all ads
router.get('/annunci', async (req, res) => {
  try {
    const annunci = await Annuncio.find();
    res.json(annunci);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// API to GET an annuncio given its id
router.get('/annunci/:id', async (req, res) => {
  try {
    const annuncio = await Annuncio.findById(req.params.id);
    if (!annuncio) {
      return res.status(404).send('Annuncio not found');
    }
    res.json(annuncio);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

// API to GET an annuncio given its id_publisher
router.get('/annunci/publisher/:publisher_id', async (req, res) => {
  try {
    const annunci = await Annuncio.find(req.params.id_publisher);
    if (!annunci) {
      return res.status(404).send('Publisher not found');
    }
    res.json(annunci);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});



// API to DELETE an annuncio given its id
router.delete('/annunci/:id', async (req, res) => {
  try {
    const annuncioEliminato = await Annuncio.findByIdAndRemove(req.params.id);
    if (!annuncioEliminato) {
      return res.status(404).send('Annuncio not found');
    }
    res.json(annuncioEliminato);
  }catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
}); 
 
// API to update an annuncio given its id
router.put('/annunci/:id', async (req, res) => {
  try {
    const annuncioAggiornato = await Annuncio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!annuncioAggiornato) {
      return res.status(404).send('Annuncio not found');
    }
    res.json(annuncioAggiornato);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;

  