require('dotenv').config({path: '../../.env'});

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Persona = require('../models/personaM')
const Attivita = require('../models/attivitaM')
const tokenChecker = require('../controllers/tokenChecker');



//persona

router.patch('/modifica/email/persona', tokenChecker, async (req, res) => {
  var persona = await Persona.findById(req.utenteLoggato._id)
  if( req.body.email != null) {
    persona.email = req.body.email,
    req.utenteLoggato.email = req.body.email
  }
  try {
      const nuovoUtente = await persona.save()
      var options = { expiresIn: "30s" }                                                     
      var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN, options);
      return res.status(200).json({ auth: true, message: "email modificata", token: newToken, nuovoUtente}) 
    } catch (err) {
      res.status(400).json({ message: "errore modifica email" })                
  }
})

router.patch('/modifica/password/persona', tokenChecker, async (req, res) => {
  var persona = await Persona.findById(req.utenteLoggato._id)
    if( req.body.password != null) {
        const passwordCryptata = await bcrypt.hash(req.body.password, 10)
        persona.password = passwordCryptata
        req.utenteLoggato.password = passwordCryptata
      }
    try {
        const nuovoUtente = await persona.save()
        var options = { expiresIn: "30s" }                                                     
        var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN, options);
        return res.status(200).json({ auth: true, message: "password modificata", token: newToken, nuovoUtente}) 
      } catch (err) {
        res.status(400).json({ message: "errore modifica password" })                
    }
})

router.patch('/modifica/telefono/persona', tokenChecker, async (req, res) => {
  var persona = await Persona.findById(req.utenteLoggato._id)
  if( req.body.telefono != null) {
    persona.telefono = req.body.telefono,
    req.utenteLoggato.telefono = req.body.telefono
  }
  try {
      const nuovoUtente = await persona.save()
      var options = { expiresIn: "30s" }                                                     
      var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN, options);
      return res.status(200).json({ auth: true, message: "telefono modificato", token: newToken, nuovoUtente}) 
    } catch (err) {
      res.status(400).json({ message: "errore modifica telefono" })                
  }
})

router.patch('/modifica/nome', tokenChecker, async (req, res) => {
  var persona = await Persona.findById(req.utenteLoggato._id)
  if( req.body.nome != null) {
    persona.nome = req.body.nome,
    req.utenteLoggato.nome = req.body.nome
  }
  try {
      const nuovoUtente = await persona.save()
      var options = { expiresIn: "30s" }                                                     
      var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN, options);
      return res.status(200).json({ auth: true, message: "nome modificato", token: newToken, nuovoUtente}) 
    } catch (err) {
      res.status(400).json({ message: "errore modifica nome" })                
  }
})

router.patch('/modifica/cognome', tokenChecker, async (req, res) => {
  var persona = await Persona.findById(req.utenteLoggato._id)
  if( req.body.cognome != null) {
    persona.cognome = req.body.cognome,
    req.utenteLoggato.cognome = req.body.cognome
  }
  try {
      const nuovoUtente = await persona.save()
      var options = { expiresIn: "30s" }                                                     
      var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN, options);
      return res.status(200).json({ auth: true, message: "cognome modificato", token: newToken, nuovoUtente}) 
    } catch (err) {
      res.status(400).json({ message: "errore modifica cognome" })                
  }
})

router.patch('/modifica/dataNascita', tokenChecker, async (req, res) => {
  var persona = await Persona.findById(req.utenteLoggato._id)
  if( req.body.dataNascita != null) {
    persona.dataNascita = req.body.dataNascita,
    req.utenteLoggato.dataNascita = req.body.dataNascita
  }
  try {
      const nuovoUtente = await persona.save()
      var options = { expiresIn: "30s" }                                                     
      var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN, options);
      return res.status(200).json({ auth: true, message: "data di nascita modificata", token: newToken, nuovoUtente}) 
    } catch (err) {
      res.status(400).json({ message: "errore modifica data di nascita" })                
  }
})

//attivita

router.patch('/modifica/email/attivita', tokenChecker, async (req, res) => {
  var attivita = await Attivita.findById(req.utenteLoggato._id)
  if( req.body.email != null) {
    attivita.email = req.body.email,
    req.utenteLoggato.email = req.body.email
  }
  try {
      const nuovoUtente = await attivita.save()
      var options = { expiresIn: "30s" }                                                     
      var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN, options);
      return res.status(200).json({ auth: true, message: "email modificata", token: newToken, nuovoUtente}) 
    } catch (err) {
      res.status(400).json({ message: "errore modifica email" })                
  }
})

router.patch('/modifica/password/attivita', tokenChecker, async (req, res) => {
  var attivita = await Attivita.findById(req.utenteLoggato._id)
    if( req.body.password != null) {
        const passwordCryptata = await bcrypt.hash(req.body.password, 10)
        attivita.password = passwordCryptata
        req.utenteLoggato.password = passwordCryptata
      }
    try {
        const nuovoUtente = await attivita.save()
        var options = { expiresIn: "30s" }                                                     
        var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN, options);
        return res.status(200).json({ auth: true, message: "password modificata", token: newToken, nuovoUtente}) 
      } catch (err) {
        res.status(400).json({ message: "errore modifica password" })                
    }
})

router.patch('/modifica/telefono/attivita', tokenChecker, async (req, res) => {
  var attivita = await Attivita.findById(req.utenteLoggato._id)
  if( req.body.telefono != null) {
    attivita.telefono = req.body.telefono,
    req.utenteLoggato.telefono = req.body.telefono
  }
  try {
      const nuovoUtente = await attivita.save()
      var options = { expiresIn: "30s" }                                                     
      var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN, options);
      return res.status(200).json({ auth: true, message: "telefono modificato", token: newToken, nuovoUtente}) 
    } catch (err) {
      res.status(400).json({ message: "errore modifica telefono" })                
  }
})

router.patch('/modifica/nomeAttivita', tokenChecker, async (req, res) => {
  var attivita = await Attivita.findById(req.utenteLoggato._id)
  if( req.body.nomeAttivita != null) {
    attivita.nomeAttivita = req.body.nomeAttivita,
    req.utenteLoggato.nomeAttivita = req.body.nomeAttivita
  }
  try {
      const nuovoUtente = await attivita.save()
      var options = { expiresIn: "30s" }                                                     
      var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN, options);
      return res.status(200).json({ auth: true, message: "nome attivita modificato", token: newToken, nuovoUtente}) 
 } catch (err) {
      res.status(400).json({ message: "errore modifica nome attivita" })                
  }
})

router.patch('/modifica/indirizzo', tokenChecker, async (req, res) => {
  var attivita = await Attivita.findById(req.utenteLoggato._id)
  if( req.body.indirizzo != null) {
    attivita.indirizzo = req.body.indirizzo,
    req.utenteLoggato.indirizzo = req.body.indirizzo
  }
  try {
      const nuovoUtente = await attivita.save()
      var options = { expiresIn: "30s" }                                                     
      var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN, options);
      return res.status(200).json({ auth: true, message: "indirizzo modificato", token: newToken, nuovoUtente}) 
    } catch (err) {
      res.status(400).json({ message: "errore modifica indirizzo" })                
  }
})

router.patch('/modifica/partitaIVA', tokenChecker, async (req, res) => {
  var attivita = await Attivita.findById(req.utenteLoggato._id)
  if( req.body.partitaIVA != null) {
    attivita.partitaIVA = req.body.partitaIVA,
    req.utenteLoggato.partitaIVA = req.body.partitaIVA
  }
  try {
      const nuovoUtente = await attivita.save()
      var options = { expiresIn: "30s" }                                                     
      var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN, options);
      return res.status(200).json({ auth: true, message: "partita iva modificata", token: newToken, nuovoUtente}) 
    } catch (err) {
      res.status(400).json({ message: "errore modifica partita iva" })                
  }
})

router.patch('/modifica/iban', tokenChecker, async (req, res) => {
  var attivita = await Attivita.findById(req.utenteLoggato._id)
  if( req.body.iban != null) {
    attivita.iban = req.body.iban,
    req.utenteLoggato.iban = req.body.iban
  }
  try {
      const nuovoUtente = await attivita.save()
      var options = { expiresIn: "30s" }                                                     
      var newToken = jwt.sign(req.utenteLoggato, process.env.SECRET_TOKEN, options);
      return res.status(200).json({ auth: true, message: "iban modificato", token: newToken, nuovoUtente}) 
    } catch (err) {
      res.status(400).json({ message: "errore modifica iban" })                
  }
})


module.exports = router;