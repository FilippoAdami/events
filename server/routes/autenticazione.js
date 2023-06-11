require('dotenv').config({path: '../../.env'});

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Persona = require('../models/personaM')
const Attivita = require('../models/attivitaM')
const tokenChecker = require('../controllers/tokenChecker');


//api login
router.post('/login', async (req, res) => {
    const persona = await Persona.findOne({ email: req.body.email, ruolo: "persona" })
    const attivita = await Attivita.findOne({ email: req.body.email, ruolo: "attivita" })
    
    if(!persona && !attivita) {
      return res.status(400).json({ auth: false, message: "utente non trovato" })
    }
    if(persona){
        var utente = JSON.parse(JSON.stringify(persona));
    } else if(attivita){
        var utente = JSON.parse(JSON.stringify(attivita));
    } else{
        return res.status(500).json({message: "dati sbagliati" })
    }
        
    try {
        if( await bcrypt.compare(req.body.password, utente.password)){
            var options = { expiresIn: "30m" }                                                     
            var token = jwt.sign(utente, process.env.SECRET_TOKEN, options);
            return res.status(200).json({ auth: true, message: "login effettuato", token: token, utente}) 
          } else {
            return res.status(400).json({ auth: false, message: "password sbagliata"})
        }
    } catch (err){
        return res.status(500).json({ message: err.message})
    }
})


//verifica autenticazione
router.get('/verifica', tokenChecker, (req, res) => {
    res.status(200).json({message: "sei autenticato, il token è valido"})
})


//logout
router.get('/logout', tokenChecker, async (req, res) => {
    try {
        res.status(200).json({ message: "logout effettuato" })
      } catch (err) {
        res.status(500).json({ message: err.message })                //errore 500: c'è un errore nel server, nel nostro caso nel database
    }
})


//elimina account
router.delete('/elimina', tokenChecker, async (req, res) => {
    if(req.utenteLoggato.ruolo == "persona"){
        var utente = await Persona.findById(req.utenteLoggato._id)
    } else if (req.utenteLoggato.ruolo == "attivita"){
        var utente = await Attivita.findById(req.utenteLoggato._id)
    }
    try {
        utente.deleteOne()
        res.status(200).json({ message: "utente eliminato"})
      } catch (err) {
        res.status(500).json({ message: err.message })                //errore 500: c'è un errore nel server, nel nostro caso nel database
    }
})



module.exports = router;