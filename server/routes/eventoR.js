const express = require('express');
const router = express.Router();
const Evento = require('../models/eventoM');

// mostra evento

router.get('/:idEvento/show', async (req,res) => {    
    const evento = await Evento.find({id_Evento : req.params.Evento});
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
router.post("/addEvento", async (req,res)=> {
    const newEvento = new Evento(req.body);
    await newEvento.save();
    res.status(201).send("event created and save thx xoxo");
});

// remove evento
router.delete('/:idEvento/destroy', async (req,res) => {
    const eventoDaEliminare = await  Evento.find(req.params.idEvento);
    const deletedCOunt = Evento.deleteOne(eventoDaEliminare);
    res.status(204).send("resource deleted xoxo");

});

// modify evento
router.put('/:idEvento/change',async (req,res) => 
{
        const evento = await Evento.findOneAndUpdate({id_Evento :  req.params.idEvento},req.body);
        if(!evento)
        {
            res.status(404).send("no evetn found with the given id");
        }
        else
        {
            res.status(204).send("changes made, well done xoxo");
        }
});

// get postiLiberi
router.get('/:idEvento/postiLiberi', async (req,res)=>{
    const evento =await Evento.findOne(req.params.idEvento);
    if(!evento)
    {
        res.status(404).send("no event found with the given id");
    }
    else
    {
        req.status(200).send(evento.select(postiLiberi));
    }
});
