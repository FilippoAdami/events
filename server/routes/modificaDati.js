require('dotenv').config({path: '../../.env'});

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Persona = require('../models/personaM')
const Attivita = require('../models/attivitaM')
const tokenChecker = require('../controllers/tokenChecker');



//persona

router.patch('/persona', tokenChecker, async (req, res) => {
  var persona = await Persona.findById(req.utenteLoggato._id)
  if( req.body.data.email != null) {
    persona.email = req.body.data.email,
    req.utenteLoggato.email = req.body.data.email
  }
  if( req.body.data.password != null) {
    const passwordCryptata = await bcrypt.hash(req.body.data.password, 10)
    persona.password = passwordCryptata
    req.utenteLoggato.password = passwordCryptata
  }
  if( req.body.data.telefono != null) {
    persona.telefono = req.body.data.telefono,
    req.utenteLoggato.telefono = req.body.data.telefono
  }
  if( req.body.data.nome != null) {
    persona.nome = req.body.data.nome,
    req.utenteLoggato.nome = req.body.data.nome
  }
  if( req.body.data.cognome != null) {
    persona.cognome = req.body.data.cognome,
    req.utenteLoggato.cognome = req.body.data.cognome
  }
  if( req.body.data.dataNascita != null) {
    persona.dataNascita = req.body.data.dataNascita,
    req.utenteLoggato.dataNascita = req.body.data.dataNascita
  }
  try {
      const nuovoUtente = await persona.save()  
      console.log("modifica")                                                
      var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN);
      return res.status(200).json({ auth: true, message: "dati modificati", newToken: newToken, nuovoUtente}) 
    } catch (err) {
      res.status(400).json({ message: "errore modifica dati" })                
  }
})

//attivita

router.patch('/attivita', tokenChecker, async (req, res) => {
  var attivita = await Attivita.findById(req.utenteLoggato._id)
  if( req.body.data.email != null) {
    attivita.email = req.body.data.email,
    req.utenteLoggato.email = req.body.data.email
  }
  if( req.body.data.password != null) {
    const passwordCryptata = await bcrypt.hash(req.body.data.password, 10)
    attivita.password = passwordCryptata
    req.utenteLoggato.password = passwordCryptata
  }
  if( req.body.data.telefono != null) {
    attivita.telefono = req.body.data.telefono,
    req.utenteLoggato.telefono = req.body.data.telefono
  }
  if( req.body.data.nomeAttivita != null) {
    attivita.nomeAttivita = req.body.data.nomeAttivita,
    req.utenteLoggato.nomeAttivita = req.body.data.nomeAttivita
  }
  if( req.body.data.indirizzo != null) {
    attivita.indirizzo = req.body.data.indirizzo,
    req.utenteLoggato.indirizzo = req.body.data.indirizzo
  } 
  if( req.body.data.partitaIVA != null) {
    attivita.partitaIVA = req.body.data.partitaIVA,
    req.utenteLoggato.partitaIVA = req.body.data.partitaIVA
  }
  if( req.body.data.iban != null) {
    attivita.iban = req.body.data.iban,
    req.utenteLoggato.iban = req.body.data.iban
  }
  try {
      const nuovoUtente = await attivita.save()      
      console.log("modifica")                                            
      var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN);
      return res.status(200).json({ auth: true, message: "dati modificati", newToken: newToken, nuovoUtente}) 
    } catch (err) {
      res.status(400).json({ message: "errore modifica dati",  error: err.message })                
  }
})


module.exports = router;