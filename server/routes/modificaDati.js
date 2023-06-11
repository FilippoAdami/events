require('dotenv').config({path: '../../.env'});

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Persona = require('../models/personaM')
const Attivita = require('../models/attivitaM')
const tokenChecker = require('../controllers/tokenChecker');



//persona

router.patch('/persona/email', tokenChecker, async (req, res) => {
  var persona = await Persona.findById(req.utenteLoggato._id)
  if( req.body.email != null) {
    persona.email = req.body.email,
    req.utenteLoggato.email = req.body.email
  }
  try {
      const nuovoUtente = await persona.save()  
      console.log("ciao")                                                
      var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN);
      return res.status(200).json({ auth: true, message: "email modificata", newToken: newToken, nuovoUtente}) 
    } catch (err) {
      res.status(400).json({ message: "errore modifica email" })                
  }
})

router.patch('/persona/password', tokenChecker, async (req, res) => {
  var persona = await Persona.findById(req.utenteLoggato._id)
    if( req.body.password != null) {
        const passwordCryptata = await bcrypt.hash(req.body.password, 10)
        persona.password = passwordCryptata
        req.utenteLoggato.password = passwordCryptata
      }
    try {
        const nuovoUtente = await persona.save()                                                    
        var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN);
        return res.status(200).json({ auth: true, message: "password modificata", newToken: newToken, nuovoUtente}) 
      } catch (err) {
        res.status(400).json({ message: "errore modifica password" })                
    }
})

router.patch('/persona/telefono', tokenChecker, async (req, res) => {
  var persona = await Persona.findById(req.utenteLoggato._id)
  if( req.body.telefono != null) {
    persona.telefono = req.body.telefono,
    req.utenteLoggato.telefono = req.body.telefono
  }
  try {
      const nuovoUtente = await persona.save()                                                  
      var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN);
      return res.status(200).json({ auth: true, message: "telefono modificato", newToken: newToken, nuovoUtente}) 
    } catch (err) {
      res.status(400).json({ message: "errore modifica telefono" })                
  }
})

router.patch('/persona/nome', tokenChecker, async (req, res) => {
  var persona = await Persona.findById(req.utenteLoggato._id)
  if( req.body.nome != null) {
    persona.nome = req.body.nome,
    req.utenteLoggato.nome = req.body.nome
  }
  try {
      const nuovoUtente = await persona.save()                                              
      var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN);
      return res.status(200).json({ auth: true, message: "nome modificato", newToken: newToken, nuovoUtente}) 
    } catch (err) {
      res.status(400).json({ message: "errore modifica nome" })                
  }
})

router.patch('/persona/cognome', tokenChecker, async (req, res) => {
  var persona = await Persona.findById(req.utenteLoggato._id)
  if( req.body.cognome != null) {
    persona.cognome = req.body.cognome,
    req.utenteLoggato.cognome = req.body.cognome
  }
  try {
      const nuovoUtente = await persona.save()                                                  
      var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN);
      return res.status(200).json({ auth: true, message: "cognome modificato", newToken: newToken, nuovoUtente}) 
    } catch (err) {
      res.status(400).json({ message: "errore modifica cognome" })                
  }
})

router.patch('/persona/dataNascita', tokenChecker, async (req, res) => {
  var persona = await Persona.findById(req.utenteLoggato._id)
  if( req.body.dataNascita != null) {
    persona.dataNascita = req.body.dataNascita,
    req.utenteLoggato.dataNascita = req.body.dataNascita
  }
  try {
      const nuovoUtente = await persona.save()                                                   
      var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN);
      return res.status(200).json({ auth: true, message: "data di nascita modificata", newToken: newToken, nuovoUtente}) 
    } catch (err) {
      res.status(400).json({ message: "errore modifica data di nascita" })                
  }
})

//attivita

router.patch('/attivita/email', tokenChecker, async (req, res) => {
  var attivita = await Attivita.findById(req.utenteLoggato._id)
  if( req.body.email != null) {
    attivita.email = req.body.email,
    req.utenteLoggato.email = req.body.email
  }
  try {
      const nuovoUtente = await attivita.save()                                                  
      var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN);
      return res.status(200).json({ auth: true, message: "email modificata", newToken: newToken, nuovoUtente}) 
    } catch (err) {
      res.status(400).json({ message: "errore modifica email",  error: err.message })                
  }
})

router.patch('/attivita/password', tokenChecker, async (req, res) => {
  var attivita = await Attivita.findById(req.utenteLoggato._id)
    if( req.body.password != null) {
        const passwordCryptata = await bcrypt.hash(req.body.password, 10)
        attivita.password = passwordCryptata
        req.utenteLoggato.password = passwordCryptata
      }
    try {
        const nuovoUtente = await attivita.save()                                                 
        var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN);
        return res.status(200).json({ auth: true, message: "password modificata", newToken: newToken, nuovoUtente}) 
      } catch (err) {
        res.status(400).json({ message: "errore modifica password" })                
    }
})

router.patch('/attivita/telefono', tokenChecker, async (req, res) => {
  var attivita = await Attivita.findById(req.utenteLoggato._id)
  if( req.body.telefono != null) {
    attivita.telefono = req.body.telefono,
    req.utenteLoggato.telefono = req.body.telefono
  }
  try {
      const nuovoUtente = await attivita.save()                                                    
      var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN);
      return res.status(200).json({ auth: true, message: "telefono modificato", newToken: newToken, nuovoUtente}) 
    } catch (err) {
      res.status(400).json({ message: "errore modifica telefono" })                
  }
})

router.patch('/attivita/nomeAttivita', tokenChecker, async (req, res) => {
  var attivita = await Attivita.findById(req.utenteLoggato._id)
  if( req.body.nomeAttivita != null) {
    attivita.nomeAttivita = req.body.nomeAttivita,
    req.utenteLoggato.nomeAttivita = req.body.nomeAttivita
  }
  try {
      const nuovoUtente = await attivita.save()                                                 
      var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN);
      return res.status(200).json({ auth: true, message: "nome attivita modificato", newToken: newToken, nuovoUtente}) 
 } catch (err) {
      res.status(400).json({ message: "errore modifica nome attivita" })                
  }
})

router.patch('/attivita/indirizzo', tokenChecker, async (req, res) => {
  var attivita = await Attivita.findById(req.utenteLoggato._id)
  if( req.body.indirizzo != null) {
    attivita.indirizzo = req.body.indirizzo,
    req.utenteLoggato.indirizzo = req.body.indirizzo
  }
  try {
      const nuovoUtente = await attivita.save()                                                  
      var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN);
      return res.status(200).json({ auth: true, message: "indirizzo modificato", newToken: newToken, nuovoUtente}) 
    } catch (err) {
      res.status(400).json({ message: "errore modifica indirizzo" })                
  }
})

router.patch('/attivita/partitaIVA', tokenChecker, async (req, res) => {
  var attivita = await Attivita.findById(req.utenteLoggato._id)
  if( req.body.partitaIVA != null) {
    attivita.partitaIVA = req.body.partitaIVA,
    req.utenteLoggato.partitaIVA = req.body.partitaIVA
  }
  try {
      const nuovoUtente = await attivita.save()                                                  
      var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN);
      return res.status(200).json({ auth: true, message: "partita iva modificata", newToken: newToken, nuovoUtente}) 
    } catch (err) {
      res.status(400).json({ message: "errore modifica partita iva" })                
  }
})

router.patch('/attivita/iban', tokenChecker, async (req, res) => {
  var attivita = await Attivita.findById(req.utenteLoggato._id)
  if( req.body.iban != null) {
    attivita.iban = req.body.iban,
    req.utenteLoggato.iban = req.body.iban
  }
  try {
      const nuovoUtente = await attivita.save()                                                 
      var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN);
      return res.status(200).json({ auth: true, message: "iban modificato", newToken: newToken, nuovoUtente}) 
    } catch (err) {
      res.status(400).json({ message: "errore modifica iban" })                
  }
})


module.exports = router;