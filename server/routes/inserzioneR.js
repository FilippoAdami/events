const express = require('express')
const router = express.Router()
const Inserzione = require('../models/inserzioneM.js')

// mostra inserzione

router.get('/:idInserzione/show', (req,res) => {

    
    const inserzione = Inserzione.find({id_Inserzione : req.params.idInserzione});

    if(!inserzione)
    {
        res.status(404).send("no insertion found using the id provided");
    }
    else
    {
        res.status(200).json(inserzione);
    }

})