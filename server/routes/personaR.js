require('dotenv').config({path: '../../.env'});

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Persona = require('../models/personaM')
const Evento = require('../models/eventoM')
const tokenChecker = require('../controllers/tokenChecker')


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

/*
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
})*/

//ritorna tutti gli utenti
router.get('/persona', async (req, res) => {
  try {
      const persona = await Persona.find({ruolo: "persona"});                           
      res.status(200).json(persona)                             
  } catch (err) {
      res.status(500).json({ message: err.message })      //errore 500: c'è un errore nel server, nel nostro caso nel database
  }
})

//ritorna tutti gli utenti persona
router.get('/persona', async (req, res) => {
    try {
        const persona = await Persona.find({ruolo: "persona"})                           
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
  if( req.body.email != null) {
    res.persona.email = req.body.email
  }
  if( req.body.password != null) {
    const passwordCryptata = await bcrypt.hash(req.body.password, 10)
    res.persona.password = passwordCryptata
  }
  if( req.body.nome != null) {
    res.persona.nome = req.body.nome
  }
  if( req.body.cognome != null) {
    res.persona.cognome = req.body.cognome
  }
  if( req.body.telefono != null) {
    res.persona.telefono = req.body.telefono
  }
  if( req.body.dataNascita != null) {
    res.persona.dataNascita = req.body.dataNascita
  }
  if( req.body.eventiPubblicati != null) {
    res.persona.eventiPubblicati = req.body.eventiPubblicati
  }
  if( req.body.prenotazioni != null) {
    res.persona.prenotazioni = req.body.prenotazioni
  }
  if( req.body.annunciPubblicati != null) {
    res.persona.annunciPubblicati = req.body.annunciPubblicati
  }
  try {
    const updatedPersona = await res.persona.save()
    res.status(200).json({ updatedPersona, message: "utente modificato"})
  } catch (err) {
    res.status(400).json({ message: err.message })                //400: errore da parte del cliente   
  }
})

//API to get a single persona by its id
router.get('/persona/:id', getPersona, (req, res) => {
  res.json(res.persona)
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
 



//Prenotazione
router.post('/persona/:id/prenotazioni', getPersona, tokenChecker, async(req,res) =>{

  let persona = res.persona
  if(!req.body.eventoID){
    res.status(400).send({message: "evento ID assente"})
  }
  
  let evento = await Evento.findById(req.body.eventoID)
  if (evento == null) {
    res.status(404).send({message: "Evento non trovato"})
  }
  console.log(evento)

  try{

    await Persona.findByIdAndUpdate(persona._id,{$push: {prenotazioni : evento._id}});
    await Evento.findByIdAndUpdate(evento._id,{$push: {utentiPrenotati : persona._id}});

    res.status(201).send({message: "prenotazione effettuate"})

  }catch(err){
    res.status(500).json({ message: err.message })
  }

})


router.delete('/persona/:id/prenotazioni/:idEvento', getPersona, tokenChecker, async(req,res) =>{

  let persona = res.persona
  if(!req.params.idEvento){
    res.status(400).send({message: "evento ID assente"})
  }
  
  let evento = await Evento.findById(req.params.idEvento)
  if (evento == null) {
    res.status(404).send({message: "Evento non trovato"})
  }

  try{

    await Persona.findByIdAndUpdate(persona._id,{$pull: {prenotazioni : evento._id}});
    await Evento.findByIdAndUpdate(evento._id,{$pull: {utentiPrenotati : persona._id}});

    res.status(200).send({message: "prenotazione cancellata"})

  }catch(err){
    res.status(500).json({ message: err.message })
  }

})


module.exports = router;