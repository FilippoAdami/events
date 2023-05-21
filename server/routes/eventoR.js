const express = require('express');
const router = express.Router();
const Evento = require('../models/eventoM');

//get all eventi
router.get('/eventi', async (req, res) => {
    try {
      const eventi = await Evento.find();
      res.json(eventi);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

// mostra specifico evento
router.get('/eventi/:id', async (req, res) => {
    try {
    const evento = await Evento.findById(req.params.id);
    if (!evento) {
        return res.status(404).send('Evento not found');
    }
    res.json(evento);
    } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
    }
});

// API to GET all the eventi published by a specific publisher
router.get('/eventi/publisher/:publisher_id', async (req, res) => {
    try {
      const evento = await Evento.find(req.params.pubblicatore);
      if (!evento) {
        return res.status(404).send('Publisher not found');
      }
      res.json(evento);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
});

// aggiungi evento
router.post("/eventi", async (req,res)=> {
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
    res.status(201).send("event created and saved");
});

// API to DELETE an evento given its id
router.delete('/eventi/:id', async (req, res) => {
    try {
      const eventoEliminato = await Evento.findByIdAndRemove(req.params.id);
      if (!eventoEliminato) {
        return res.status(404).send('evento not found');
      }
      res.json(eventoEliminato);
    }catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  }); 

// API to update an evento given its id
router.put('/eventi/:id', async (req, res) => {
    try {
      const eventoAggiornato = await Evento.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!eventoAggiornato) {
        return res.status(404).send('evento not found');
      }
      res.json(eventoAggiornato);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
});

// Get postiLiberi of a specific evento
router.get('/eventi/:id/postiLiberi', async (req, res) => {
    try {
      const evento = await Evento.findOne({ _id: req.params.id });
      if (!evento) {
        return res.status(404).send("No event found with the given ID");
      }
      res.send(evento.postiLiberi.toString());
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
// Get coordinate of a scpecific evento
router.get('/eventi/:id/coordinate', async (req, res) => {
    try {
      const evento = await Evento.findOne({ _id: req.params.id });
      if (!evento) {
        return res.status(404).send("No event found with the given ID");
      }
      res.send(evento.indirizzo.toString());
    } catch (error) {
      res.status(500).send(error.message);
    }
});  
 
// Get utentiPrenotati infos to a specific evento
router.get('/eventi/:id/utentiPrenotati', async (req, res) => {
    try {
      const evento = await Evento.findById(req.params.id).populate('utentiPrenotati', 'nome cognome email');
      if (!evento) {
        return res.status(404).send('No event found with the given ID');
      }
      const utentiPrenotati = evento.utentiPrenotati.map(persona => ({
        nome: persona.nome,
        cognome: persona.cognome,
        email: persona.email
      }));
      res.status(200).json(utentiPrenotati);
    } catch (error) {
      res.status(500).send(error.message);
    }
});
 

module.exports = router;