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
    const newEvento = new Evento
    ({
        titolo : req.body.titolo,
        data : req.body.data,
        ora: req.body.ora,
        indirizzo : req.body.indirizzo,
        descrizione : req.body.descrizione,
        immagini : req.body.immagini,    // non sono sicuro di questo
        costo: req.body.costo,
        posti : req.body.posti,
        postiLiberi : req.body.posti,
        visibilita : req.body.visibilita,
        categoria : req.body.categoria,
        pubblicatore : req.body.pubblicatore,
        utentiPreonotati : [],
        segnalato : false,
        segnalazioni : []
    });
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
            res.status(404).send("no event found with the given id");
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

// get coordinate

router.get('/:idEvento/coordinate',async (req, res) => {
    const evento = await Evento.findOne(req.params.idEvento);
    if(!evento)
    {
        res.status(404).send("no event found with the given id");
    }
    else
    {
        res.status(200).send(evento.select(indirizzo));
    }
})


// get utenti prenotati

router.get('/:idEvento/utentiPrenotati',(req,res)=>{

    const evento = Evento.findOne(req.params.idEvento).populate("Persona",{"nome": any, "email": any,"telefono":any});

    if(evento.populated("Persona"))
    {
        res.status(200).send(evento.select("utentiPrenotati"));
    }
    else
    {
        console.log("error while populating, retry");
    }
})