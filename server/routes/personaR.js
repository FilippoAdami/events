const express = require('express')
const router = express.Router()
const Persona = require('../models/personaM')


//ritorna tutti gli utenti persona
router.get('/users', async (req, res) => {
    try {
        const persona = await Persona.find()
        res.json(persona)                             
    } catch (err) {
        res.status(500).json({ message: err.message })      //errore 500: c'è un errore nel server, nel nostro caso nel database
    }
})


//crea un oggetto persona
router.post('/users', async (req, res) => {
    const persona = new Persona(req.body)
    try {
        const newPersona = await persona.save()
        res.status(201).json(newPersona)                      //201: oggetto creato correttamente
    } catch (err) {
        res.status(400).json({ message: err.message })       //400: errore da parte del cliente
    }
})


//api registrazione
router.post('/users/register', async (req, res) => {
  console.log(req.body)
  try {
    await Persona.create({
      email: req.body.email,
      password: req.body.password,
      nome: req.body.nome,
      cognome: req.body.cognome,
      telefono: req.body.telefono,
      dataNascita: req.body.dataNascita,
    })
    res.json({ status: 'ok' })
  } catch (err) {
    res.json({ status: 'error', error: 'duplicate mail' })  
  }
})

//api login
router.post('/users/login', async (req, res) => {
    const persona = await Persona.findOne({ 
      email: req.body.email,
      password: req.body.password,
    })
  if(persona) {
    return res.status(200).json({ persona: true })
  } else {
    return res.status(400).json({ persona: false })
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
router.put('/users/:id', getPersona, async (req, res) => {
  if (req.body != null) {
    Object.keys(req.body).forEach(dato => {                               //funzione che permette di sovrascrivere in nuovi dati su quelli vecchi
      res.persona[dato] = req.body[dato]
    })
  }
    try {
      const updatedPersona = await res.persona.save()
      res.json(updatedPersona)
    } catch (err) {
      res.status(400).json({ message: err.message })                //400: errore da parte del cliente   
    }
})


//ritorna l'utente con il parametro richiesto
router.get('/users/:id', getPersona, (req, res) => {
  res.json(res.persona)
})


//Rimuove un oggetto persona
router.delete('/users/:id', getPersona, async (req, res) => {
    try {
      await res.persona.deleteOne()
      res.json({ message: 'Utente correttamente rimosso' })
    } catch (err) {
      res.status(500).json({ message: err.message })                //errore 500: c'è un errore nel server, nel nostro caso nel database
    }
})

  
module.exports = router;