require('dotenv').config({path: '../../.env'});

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Persona = require('../models/personaM')


//api registrazione
router.post('/persona/register', async (req, res) => {
  console.log(req.body)
  try {
    const passwordCryptata = await bcrypt.hash(req.body.password, 10)
    const persona = await Persona.create({
      email: req.body.email,
      password: passwordCryptata,
      nome: req.body.nome,
      cognome: req.body.cognome,
      telefono: req.body.telefono,
      dataNascita: req.body.dataNascita,
    })
    return res.status(201).json({persona, message: "utente registrato"})
  } catch (err) { 
    return res.status(400).json({ status: 'error', error: err })  
  }
})

//api login
router.post('/persona/login', async (req, res) => {
  const persona = await Persona.findOne({ email: req.body.email })
  
  if(persona == null) {
    return res.status(400).json({ persona: false, message: "utente non trovato" })
  }
  try {
    if( await bcrypt.compare(req.body.password, persona.password)){
      var payload = { email: persona.email }
      var options = { expiresIn: 86400 }                                                      //termina in 24 ore
      var token = jwt.sign(payload, process.env.SECRET_TOKEN, options);
      return res.status(200).json({ persona: true, message: "login effettuato", email: persona.email, token: token }) 
    } else {
      return res.status(400).json({ message: "password sbagliata"})
    }
  } catch {
    return res.status(500).json({ message: "dati sbagliati"})
  }
})


//ritorna tutti gli utenti persona
router.get('/persona', async (req, res) => {
    try {
        const persona = await Persona.find()                           
        res.status(200).json(persona)                             
    } catch (err) {
        res.status(500).json({ message: err.message })      //errore 500: c'è un errore nel server, nel nostro caso nel database
    }
})

//funzione che ritorna l'utente persona con l'id corrispondente, utilizzata nei metodi sottostanti
async function getPersona(req, res, next) {
    let persona
    try {
      persona = await Persona.findById(req.params.id)
      if (persona == null) {
        return res.status(404).json({ message: 'Utente non trovato' })    //400: errore da parte del cliente
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })               //errore 500: c'è un errore nel server, nel nostro caso nel database
    }
  
    res.persona = persona
    next()
}

//modifica un oggetto persona già esistente
router.put('/persona/:id', getPersona, async (req, res) => {
  if (req.body != null) {
    Object.keys(req.body).forEach(dato => {                               //funzione che permette di sovrascrivere in nuovi dati su quelli vecchi
      res.persona[dato] = req.body[dato]
    })
  }
    try {
      const updatedPersona = await res.persona.save()
      res.status(200).json({ updatedPersona, message: "utente modificato"})
    } catch (err) {
      res.status(400).json({ message: err.message })                //400: errore da parte del cliente   
    }
})

//ritorna l'utente con il parametro richiesto
router.get('/persona/:id', getPersona, (req, res) => {
  res.status(200).json(res.persona)
})

//Rimuove un oggetto persona
router.delete('/persona/:id', getPersona, async (req, res) => {
    try {
      await res.persona.deleteOne()
      res.status(200).json({ message: 'Utente correttamente rimosso' })
    } catch (err) {
      res.status(500).json({ message: err.message })                //errore 500: c'è un errore nel server, nel nostro caso nel database
    }
})
 
module.exports = router;