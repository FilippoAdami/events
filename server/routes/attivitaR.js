const express = require('express')
const router = express.Router()
const Attivita = require('../models/attivitaM')

//ritorna tutti gli utenti attività
router.get('/attivita', async (req, res) => {
    try {
        const attivita = await Attivita.find()
        res.json(attivita)                             
    } catch (err) {
        res.status(500).json({ message: err.message })      //errore 500: c'è un errore nel server, nel nostro caso nel database
    }
})

//crea un oggetto attività
router.post('/attivita', async (req, res) => {
    const attivita = new Attivita(req.body)
    try {
        const newAttivita = await attivita.save()
        res.status(201).json(newAttivita)                      //201: oggetto creato correttamente
    } catch (err) {
        res.status(400).json({ message: err.message })       //400: errore da parte del cliente
    }
})


//api registrazione
router.post('/attivita/register', async (req, res) => {
  try {
    await Attivita.create({
      email: req.body.email,
      password: req.body.password,
      nomeAttivita: req.body.nomeAttivita,
      indirizzo: req.body.indirizzo,
      telefono: req.body.telefono,
      partitaIVA: req.body.partitaIVA,
      IBAN: req.body.IBAN 
    })
    res.json({ status: 'ok' })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', error: 'duplicate mail' })  
  }
})


//funzione che ritorna l'utente attività con l'id corrispondente, utilizzata nei metodi sottostanti
async function getAttivita(req, res, next) {
    let attivita
    try {
      attivita = await Attivita.findById(req.params.id)
      if (attivita == null) {
        return res.status(404).json({ message: 'Utente non trovato' })    //400: errore da parte del cliente
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })               //errore 500: c'è un errore nel server, nel nostro caso nel database
    }
  
    res.attivita = attivita
    next()
}

//modifica un oggetto attività già esistente
router.put('/attivita/:id', getAttivita, async (req, res) => {
  if (req.body != null) {
    Object.keys(req.body).forEach(dato => {                               //funzione che permette di sovrascrivere in nuovi dati su quelli vecchi
      res.attivita[dato] = req.body[dato]
    })
  }
    try {
      const newAttivita = await res.attivita.save()
      res.json(newAttivita)
    } catch (err) {
      res.status(400).json({ message: err.message })                //400: errore da parte del cliente   
    }
})

//ritorna l'utente con il parametro richiesto
router.get('/attivita/:id', getAttivita, (req, res) => {
  res.json(res.attivita)
})

//Rimuove un oggetto attività
router.delete('/attivita/:id', getAttivita, async (req, res) => {
    try {
      await res.attivita.deleteOne()
      res.json({ message: 'Utente correttamente rimosso' })
    } catch (err) {
      res.status(500).json({ message: err.message })                //errore 500: c'è un errore nel server, nel nostro caso nel database
    }
})

module.exports = router;