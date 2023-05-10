const express = require('express');
const router = express.Router();
const Ad = require('../models/inserzione');

router.post('/ads', async (req, res) => {
  try {
    const ad = new Ad(req.body);
    await ad.save();
    res.status(201).send(ad);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

  