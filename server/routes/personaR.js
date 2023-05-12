const express = require('express')
const router = express.Router()
const Persona = require('../models/personaM.js')


//ritorna tutti gli utenti persona
router.get('/persona', async (req, res) => {
    try {
        const persona = await Persona.find()
        res.json(persona)                             
    } catch (err) {
        res.status(500).json({ message: err.message })      //errore 500: c'è un errore nel server, nel nostro caso nel database
    }
})


//crea un oggetto persona
router.post('/persona', async (req, res) => {
    const persona = new Persona(
        //{nome: req.body.nome}
        req.body
    )
    try {
        const newPersona = await persona.save()
        res.status(201).json(newPersona)                      //201: oggetto creato correttamente
    } catch (err) {
        res.status(400).json({ message: err.message })       //400: errore da parte del cliente
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
router.patch('/persona/:id', getPersona, async (req, res) => {
    if (req.body.email != null) {
      res.persona.email = req.body.email
    }
    if (req.body.password != null) {
        res.persona.password = req.body.password
      }
    if (req.body.nome != null) {
        res.persona.nome = req.body.nome
    }
    if (req.body.cognome != null) {
      res.persona.cognome = req.body.cognome
    } 
    if (req.body.telefono!= null) {
        res.persona.telefono = req.body.telefono
    }   
    try {
      const updatedPersona = await res.persona.save()
      res.json(updatedPersona)
    } catch (err) {
      res.status(400).json({ message: err.message })                //400: errore da parte del cliente   
    }
})


//ritorna l'utente con il parametro richiesto
router.get('/persona/:id', getPersona, (req, res) => {
  res.json(res.persona)
})


//Rimuove un oggetto persona
router.delete('/persona/:id', getPersona, async (req, res) => {
    try {
      await res.persona.deleteOne()
      res.json({ message: 'Utente correttamente rimosso' })
    } catch (err) {
      res.status(500).json({ message: err.message })                //errore 500: c'è un errore nel server, nel nostro caso nel database
    }
})

  
module.exports = router;