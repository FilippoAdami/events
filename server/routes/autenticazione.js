require('dotenv').config({path: '../../.env'});

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Persona = require('../models/personaM')
const Attivita = require('../models/attivitaM')

//api login
router.post('/login', async (req, res) => {
    const persona = await Persona.findOne({ email: req.body.email, ruolo: "persona" })
    const attivita = await Attivita.findOne({ email: req.body.email, ruolo: "attivita" })
    
    if(persona == null && attivita == null) {
      return res.status(400).json({ utente: false, message: "utente non trovato" })
    }
    if(persona){
        var utente = persona
    } else if(attivita){
        var utente = attivita
    } else{
        return res.status(500).json({ message: "dati sbagliati"})
    }
    try {
        if( await bcrypt.compare(req.body.password, utente.password)){
            var payload = { email: utente.email }
            var options = { expiresIn: 86400 }            //termina in 24 ore
            var token = jwt.sign(payload, process.env.SECRET_TOKEN, options);
            return res.status(200).json({ utente: true, message: "login effettuato", email: utente.email, ruolo: utente.ruolo, token: token }) 
        } else {
            return res.status(400).json({ utente: false, message: "password sbagliata"})
        }
    } catch {
        return res.status(500).json({ message: "dati sbagliati"})
    }
})

  module.exports = router;