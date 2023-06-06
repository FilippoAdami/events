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
    
    if(persona == null && attivita == null) {
      return res.status(400).json({ auth: false, message: "utente non trovato" })
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

            var payload = { id: utente._id, email: utente.email }
            var options = { expiresIn: "30s" }                                                     
            var token = jwt.sign(payload, process.env.SECRET_TOKEN, options);
            return res.status(200).json({ auth: true, message: "login effettuato", token: token, utente }) 
          
        } else {
            return res.status(400).json({ auth: false, message: "password sbagliata"})
        }
    } catch {
        return res.status(500).json({ message: "dati sbagliati"})
    }
})


//verifica autenticazione
router.get('/verifica', tokenChecker, (req, res) => {
    res.send("sei autenticato")
})


//logout
router.get('/logout', tokenChecker, async (req, res) => {
    const persona = await Persona.findOne({ _id: req.userVerificato.id, ruolo: "persona" })
    const attivita = await Attivita.findOne({ _id: req.userVerificato.id, ruolo: "attivita" })
    
    if(persona == null && attivita == null) {
      return res.status(400).json({ auth: false, message: "utente non trovato" })
    }
    if(persona){
        var utente = persona
    } else if(attivita){
        var utente = attivita
    } else{
        return res.status(500).json({ message: "dati sbagliati"})
    }
    try {
        res.status(200).json({ utente })
      } catch (err) {
        res.status(500).json({ message: err.message })                //errore 500: c'è un errore nel server, nel nostro caso nel database
    }
})


//elimina account
router.delete('/elimina', tokenChecker, async (req, res) => {
    const persona = await Persona.findOne({ _id: req.userVerificato.id, ruolo: "persona" })
    const attivita = await Attivita.findOne({ _id: req.userVerificato.id, ruolo: "attivita" })
    
    if(persona == null && attivita == null) {
      return res.status(400).json({ auth: false, message: "utente non trovato" })
    }
    if(persona){
        var utente = persona
    } else if(attivita){
        var utente = attivita
    } else{
        return res.status(500).json({ message: "dati sbagliati"})
    }
    try {
        utente.deleteOne()
        res.status(200).json({ message: "utente correttamente rimossa ciao"})
      } catch (err) {
        res.status(500).json({ message: err.message })                //errore 500: c'è un errore nel server, nel nostro caso nel database
    }
})



module.exports = router;