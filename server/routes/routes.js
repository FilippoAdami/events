//routes main file
const express = require('express');
const router = express.Router();

//import routes
const eventoR = require('./eventoR');
const annunciR = require('./annunciR');
const bannerR = require('./bannerR');
const personaR = require('./personaR');
const attivitaR = require('./attivitaR');
const amministratoriR = require('./amministratoriR');
const autenticazione = require('./autenticazione');

// Set up routes
router.use('/api', annunciR);
router.use('/api', eventoR);
router.use('/api', personaR);
router.use('/api', attivitaR);
router.use('/api', bannerR);
router.use('/api', amministratoriR);
router.use('/api', autenticazione)

module.exports = router;