const express = require('express');
const router = express.Router();
const Annuncio = require('../models/annuncioM.js');

router.post('/annunci', async (req, res) => {
  try {
    const ad = new Annuncio(req.body);
    await ad.save();
    res.status(201).send(ad);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

  