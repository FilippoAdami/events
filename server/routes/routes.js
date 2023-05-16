//routes main file
const express = require('express');
const router = express.Router();

//import routes
const annunciR = require('./annunciR');
const personaR = require('./personaR');
const attivitaR = require('./attivitaR');
const bannerR = require('./bannerR');
const amministratoriR = require('./amministratoriR');

// Set up routes
router.use('/api', annunciR);
router.use('/api', personaR);
router.use('/api', attivitaR);
router.use('/api', bannerR);
router.use('/api', amministratoriR);

module.exports = router;