const express = require('express');
const router = express.Router();
const Amministratore = require('../models/amministratoreM.js');

//API to post a new amministratori
router.post('/amministratori', async (req, res) => {
  try {
    const amministratori = new Amministratore(req.body);
    await amministratori.save();
    res.status(201).send(amministratori);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET all amministratori
router.get('/amministratori', async (req, res) => {
  try {
    const amministratori = await Amministratore.find();
    res.json(amministratori);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// API to GET an amministratore given its id
router.get('/amministratori/:id', async (req, res) => {
  try {
    const amministratori = await Amministratore.findById(req.params.id);
    if (!amministratori) {
      return res.status(404).send('amministratori not found');
    }
    res.json(amministratori);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

// API to GET all amministratori given their role
router.get('/amministratori/role/:role', async (req, res) => {
  const role = req.params.role;
  try {
    const amministratori = await Amministratore.find({ role });
    res.status(200).json(amministratori);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// API to DELETE an amministratori given its id
router.delete('/amministratori/:id', async (req, res) => {
  try {
    const amministratoriEliminato = await Amministratore.findByIdAndRemove(req.params.id);
    if (!amministratoriEliminato) {
      return res.status(404).send('amministratori not found');
    }
    res.json(amministratoriEliminato);
  }catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
}); 
 
// API to update an amministratori given its id
router.put('/amministratori/:id', async (req, res) => {
  try {
    const amministratoriAggiornato = await Amministratore.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!amministratoriAggiornato) {
      return res.status(404).send('amministratori not found');
    }
    res.json(amministratoriAggiornato);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;