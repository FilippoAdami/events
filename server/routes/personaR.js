const express = require('express')
const router = express.Router()
const UtenteAnonimo = require('../models/uAnonimo')
const UtenteAutenticato = require('../models/uAutenticato')
const Persona = require('../models/persona')

//ritorna tutti gli utenti persona
router.get('/', async (req, res) => {
    try {
        const persona = await Persona.find()
        res.send(persona)                             
    } catch (err) {
        res.status(500).json({ message: err.message })      //errore 500: c'è un errore nel server, nel nostro caso nel database
    }
})

module.exports = router;

//crea un utente persona
router.post('/', async (req, res) => {
    /*const utenteAnonimo = new UtenteAnonimo({
        id: req.body.id
    })
    const utenteAutenticato = new UtenteAutenticato({
        email: req.body.email,
        password: req.body.password,
        base: req.body.utenteAnonimo
    })*/
    const persona = new Persona({
        nome: req.body.nome,
        cognome: req.body.cognome,
        telefono: req.body.telefono,
        dataNascita: req.body.dataNascita,
        prenotazioni: req.body.prenotazioni,
        annunciPubblicati: req.body.annunciPubblicati,
        base: req.body.utenteAutenticato
    })
    try {
        const newPersona = await persona.save()
        res.status(201).json(newPersona)                  //201: oggetto creato correttamente
    } catch (err) {
        res.status(400).json({ message: err.message })          //400: errore da parte del cliente
    }
})

//funzione che permette di trovare un utente tramite un parametro, in questo caso id
async function getPersona(req, res, next){
    let persona
    try {
        persona = await Persona.findById(req.params.id)
        if(persona == null){
           return res.status(404).json({ message: 'utente non trovato' })         //404: oggetto non esiste
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })           //500: errore nel server
    }
    res.persona = persona
    next()
}

//ritorna l'utente con il parametro richiesto
router.get('/:id', getPersona, (req, res) => {
    res.json(res.persona)
})

//modifica un utente già esistente, in questo caso modifica solo l'id
router.patch('/:id', getPersona, async (req, res) => {
    if (req.body.id != null) {
        res.persona.id = res.body.id
    }
    try {
        const updatedPersona = await res.persona.save()
        res.json(updatedPersona)
    } catch (err) {
        res.status(400).json({ message: err.message })                  //400: errore da parte del cliente
    }
})

//elimina l'utente con il parametro passato, in questo caso l'id
router.delete('/id:', getPersona, async (req, res) => {
    try {
        await res.persona.remove()
        res.json({ message: 'utente correttamente rimosso' })
    } catch (err) {
        res.status(500).json({ message: res.message })                  //500: errore nel server
    }
})

module.exports = router

