const express = require('express')
const router = express.Router()
const UtenteAnonimo = require('../models/uAnonimo')

//ritorna tutti gli utenti anonimi
router.get('/', async (req, res) => {
    try {
        const utenteAnonimo = await UtenteAnonimo.find()
        res.send(utenteAnonimo)                             
    } catch (err) {
        res.status(500).json({ message: err.message })      //errore 500: c'è un errore nel server, nel nostro caso nel database
    }
})

module.exports = router;