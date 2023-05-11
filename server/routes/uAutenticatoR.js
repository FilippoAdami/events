const express = require('express')
const router = express.Router()
const UtenteAnonimo = require('../models/uAnonimoM')
const UtenteAutenticato = require('../models/uAutenticatoM')

//ritorna tutti gli utenti autenticati
router.get('/', async (req, res) => {
    try {
        const utenteAutenticato = await UtenteAutenticato.find()
        res.send(utenteAutenticato)                             
    } catch (err) {
        res.status(500).json({ message: err.message })      //errore 500: c'è un errore nel server, nel nostro caso nel database
    }
})

//funzione che permette di trovare un utente tramite un parametro, in questo caso id
async function getUtenteAutenticato(req, res, next){
    let utenteAutenticato
    try {
        utenteAutenticato = await UtenteAutenticato.findById(req.params.id)
        if(utenteAutenticato == null){
           return res.status(404).json({ message: 'utente non trovato' })         //404: oggetto non esiste
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })           //500: errore nel server
    }
    res.utenteAutenticato = utenteAutenticato
    next()
}

//ritorna l'utente con il parametro richiesto
router.get('/:id', getUtenteAutenticato, (req, res) => {
    res.json(res.utenteAutenticato)
})

//elimina l'utente con il parametro passato, in questo caso l'id
router.delete('/id:', getUtenteAutenticato, async (req, res) => {
    try {
        await res.utenteAutenticato.remove()
        res.json({ message: 'utente correttamente rimosso' })
    } catch (err) {
        res.status(500).json({ message: res.message })                  //500: errore nel server
    }
})

module.exports = router