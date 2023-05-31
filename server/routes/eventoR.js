const express = require('express');
const router = express.Router();
const Evento = require('../models/eventoM');
const tokenChecker = require('../controllers/tokenChecker.js');


//API to post a new evento (updated with tokenChecker)
router.post('/eventi', tokenChecker, async (req, res) => {
  try {
    const eventoData = req.body;
    const utenteLoggato = req.utenteLoggato;
    eventoData.pubblicatore = utenteLoggato.id;

    eventoData.postiLiberi = eventoData.posti;
    eventoData.segnalato=false;

    // se non è definita una tipologia viene settata di defoult su altro
    if(!eventoData.categoria){
      eventoData.categoria = "altro"
    }

    //Controllo la richiesta che non manchi di alcuni attributi necessari: titolo, data, ora, indirizzo, costo, posti, visibilità
    if(!eventoData.titolo){
      let errore ={ errormessage: "Titolo assente"}
      res.status(400).send(errore);
    }else if(!eventoData.data){
      let errore ={ errormessage: "Data assente"}
      res.status(400).send(errore);
    }else if(!eventoData.ora){
      let errore ={ errormessage: "Ora assente"}
      res.status(400).send(errore);
    }else if(!eventoData.indirizzo){
      let errore ={ errormessage: "Indirizzo assente"}
      res.status(400).send(errore);
    }else if(!eventoData.costo){
      let errore ={ errormessage: "Costo assente"}
      res.status(400).send(errore);
    }else if(!eventoData.posti){
      let errore ={ errormessage: "Posti assente"}
      res.status(400).send(errore);
    }else if(!eventoData.visibilita){
      let errore ={ errormessage: "Visibilita assente"}
      res.status(400).send(errore);
    }else {
      const evento = new Evento(eventoData);
      await evento.save();
      res.status(201).send(evento);
    }
  } catch (error) {
    res.status(500).send(JSON.stringify(error.message));
  }
});


//Get all eventi (doesn't require authentication)
router.get('/eventi', async (req, res) => {
    try {
      const eventi = await Evento.find();
      res.json(eventi);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});


// API to GET an evento given its id (doesn't require authentication)
router.get('/eventi/:id', async (req, res) => {
    try {
    const evento = await Evento.findById(req.params.id);
    if (!evento) {
        return res.status(404).send({errormessag: 'Evento not found'});
    }
    res.json(evento);
    } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
    }
});



//function to get the infos of a specific event given its id
async function getEvento(req, res, next) {
  let evento
  try {
    evento = await Evento.findById(req.params.id)
    if (evento == null) {
      return res.status(404).send('Evento non trovato')
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('errore al server in getEvento')
  }
  res.evento = evento
  next()
}


// API to GET all the eventi published by a specific publisher (updated with tokenChecker)
router.get('/eventi/publisher/:publisher_id', tokenChecker, async (req, res) => {
    try {

      const publisherId = req.params.publisher_id;
      const utenteLoggato = req.utenteLoggato;

      // Check if the publisher_id matches the ID of the logged-in user
      if (publisherId !== utenteLoggato.id) {
        console.log(utenteLoggato.id + ' ' + publisherId  );
        return res.status(403).send('Unauthorized access' ); 
      }

      const eventi = await Evento.find({ pubblicatore: publisherId });

      res.json(eventi);
    } catch (error) {
      res.status(500).send(error);
    }
});


// API to DELETE an evento given its id
router.delete('/eventi/:id',getEvento, tokenChecker, async (req, res) => {
    try {

      const utenteLoggato = req.utenteLoggato;
      const evento = res.evento;

      // Check if the publisher_id matches the ID of the logged-in user
      if (evento.pubblicatore !== utenteLoggato.id) {
        return res.status(403).send('Unauthorized access');
      }

      evento.deleteOne();

      res.send('Evento deleted successfully');
    } catch (error) {
      console.log(error.message);
      res.status(500).send('errore al server in delete evento');
    }
}); 

// API to update an evento given its id
router.put('/eventi/:id', getEvento, tokenChecker, async (req, res) => {
    try {

      const utenteLoggato = req.utenteLoggato;
      const evento = res.evento;

      // Check if the publisher_id matches the ID of the logged-in user
      if (evento.pubblicatore !== utenteLoggato.id) {
        return res.status(403).send('Unauthorized access');
      }

      // Extract the fields from the request body
      const { id, pubblicatore, ...updatedFields } = req.body;

      // Update the remaining fields of the annuncio
      Object.assign(evento, updatedFields);

      const eventoAggiornato = await evento.save();

      res.json(eventoAggiornato);
      } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
      }
});

// Get postiLiberi of a specific evento
router.get('/eventi/:id/postiLiberi',  getEvento,  async (req, res) => {
    try {

      const evento = res.evento;
      res.send(evento.postiLiberi.toString());

    } catch (error) {
      res.status(500).send(error.message);
    }
});
  
// Get coordinate of a scpecific evento
router.get('/eventi/:id/coordinate', getEvento, async (req, res) => {
    try {
      const evento = res.evento;
      res.send(evento.indirizzo.toString());

    } catch (error) {
      res.status(500).send(error.message);
    }
});  
 
// Get utentiPrenotati infos to a specific evento
router.get('/eventi/:id/utentiPrenotati', getEvento, tokenChecker, async (req, res) => {
    try {
      const evento = res.evento;
      const utenteLoggato = req.utenteLoggato;
   
      // Check if the publisher_id matches the ID of the logged-in user
      if (evento.pubblicatore !== utenteLoggato.id) {
        return res.status(403).send('Unauthorized access');
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