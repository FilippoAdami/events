const mongoose = require('mongoose');
const Evento = require('./eventoM.js');

const personaSchema = new mongoose.Schema({
  //id: {type: Number, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ruolo: { type: String, required: true, default: "persona"},
  nome: { type: String, required: true },
  cognome: { type: String, required: true },
  telefono: { type: Number, required: true },
  dataNascita: { type: Date },
  eventiPubblicati: [{type: mongoose.Schema.Types.ObjectId, ref :Evento}],
  prenotazioni: [{type : mongoose.Schema.Types.ObjectId, ref :Evento}],
  annunciPubblicati: [{type: mongoose.Schema.Types.ObjectId, ref :Evento}]
}, { collection: 'utenti' });
  
module.exports = mongoose.model('Persona', personaSchema);