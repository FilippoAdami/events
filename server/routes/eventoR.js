const express = require('express');
const router = express.Router();
const Evento = require('../models/eventoM');

// mostra evento

router.get('/:idEvento/show', (req,res) => {
    const evento = Evento.find({id_Evento : req.params.Evento});
    if(!evento)
    {
        res.status(404).send("no event found using the id provided");
    }
    else
    {
        res.status(200).json(evento);
    }
});

// aggiungi evento
router.post("/addEvento",(req,res)=> {
    const newEvento = new Evento(req.body);
    newEvento.save();
    res.status(201).send("event created and save thx xoxo");
});

// remove evento
router.delete(':idEvento/destroy',(req,res) => {
    const eventoDaEliminare = Evento.find(req.params.idEvento);
    const deletedCOunt = Evento.deleteOne(eventoDaEliminare);
    res.status(204).send("resource deleted xoxo");
});
