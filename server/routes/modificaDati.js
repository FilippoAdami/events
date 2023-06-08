require('dotenv').config({path: '../../.env'});

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Persona = require('../models/personaM')
const Attivita = require('../models/attivitaM')
const tokenChecker = require('../controllers/tokenChecker');


router.patch('/modifica/email', tokenChecker, async (req, res) => {
    if( req.body.email != null) {
        req.utenteLoggato.email = req.body.email
    }
    try {
        const nuovoUtente = await req.utenteLoggato.save()
        res.status(200).json({ nuovoUtente, message: "email modificata"})
      } catch (err) {
        res.status(400).json({ message: err.message })                
    }
})

router.patch('/modifica/password', tokenChecker, async (req, res) => {
    if( req.body.password != null) {
        const passwordCryptata = await bcrypt.hash(req.utenteLoggato.password, 10)
        req.utenteLoggato.password = passwordCryptata
      }
    try {
        const nuovoUtente = await req.utenteLoggato.save()
        res.status(200).json({ nuovoUtente, message: "password modificata"})
      } catch (err) {
        res.status(400).json({ message: err.message })                
    }
})

router.patch('/modifica/telefono', tokenChecker, async (req, res) => {
  if( req.body.telefono != null) {
      req.utenteLoggato.telefono = req.body.telefono
  }
  try {
      const nuovoUtente = await req.utenteLoggato.save()
      res.status(200).json({ nuovoUtente, message: "telefono modificato"})
    } catch (err) {
      res.status(400).json({ message: err.message })                
  }
})

//persona

router.patch('/modifica/nome', tokenChecker, async (req, res) => {
  if( req.body.nome != null) {
      req.utenteLoggato.nome = req.body.nome
  }
  try {
      const nuovoUtente = await req.utenteLoggato.save()
      res.status(200).json({ nuovoUtente, message: "nome modificato"})
    } catch (err) {
      res.status(400).json({ message: err.message })                
  }
})

router.patch('/modifica/cognome', tokenChecker, async (req, res) => {
  if( req.body.nome != null) {
      req.utenteLoggato.cognome = req.body.cognome
  }
  try {
      const nuovoUtente = await req.utenteLoggato.save()
      res.status(200).json({ nuovoUtente, message: "congome modificato"})
    } catch (err) {
      res.status(400).json({ message: err.message })                
  }
})

router.patch('/modifica/dataNascita', tokenChecker, async (req, res) => {
  if( req.body.dataNascita != null) {
      req.utenteLoggato.dataNascita = req.body.dataNascita
  }
  try {
      const nuovoUtente = await req.utenteLoggato.save()
      res.status(200).json({ nuovoUtente, message: "data di nascita modificata"})
    } catch (err) {
      res.status(400).json({ message: err.message })                
  }
})

//attivita

router.patch('/modifica/nomeAttivita', tokenChecker, async (req, res) => {
  if( req.body.nomeAttivita != null) {
      req.utenteLoggato.nomeAttivita = req.body.nomeAttivita
  }
  try {
      const nuovoUtente = await req.utenteLoggato.save()
      res.status(200).json({ nuovoUtente, message: "nome attività modificato"})
    } catch (err) {
      res.status(400).json({ message: err.message })                
  }
})

router.patch('/modifica/indirizzo', tokenChecker, async (req, res) => {
  if( req.body.indirizzo != null) {
      req.utenteLoggato.indirizzo = req.body.indirizzo
  }
  try {
      const nuovoUtente = await req.utenteLoggato.save()
      res.status(200).json({ nuovoUtente, message: "indirizzo modificato"})
    } catch (err) {
      res.status(400).json({ message: err.message })                
  }
})

router.patch('/modifica/partitaIVA', tokenChecker, async (req, res) => {
  if( req.body.partitaIVA != null) {
      req.utenteLoggato.partitaIVA = req.body.partitaIVA
  }
  try {
      const nuovoUtente = await req.utenteLoggato.save()
      res.status(200).json({ nuovoUtente, message: "partita IVA modificata"})
    } catch (err) {
      res.status(400).json({ message: err.message })                
  }
})

router.patch('/modifica/iban', tokenChecker, async (req, res) => {
  if( req.body.iban != null) {
      req.utenteLoggato.iban = req.body.iban
  }
  try {
      const nuovoUtente = await req.utenteLoggato.save()
      res.status(200).json({ nuovoUtente, message: "iban modificato"})
    } catch (err) {
      res.status(400).json({ message: err.message })                
  }
})


module.exports = router;