const mongoose = require('mongoose');

const attivitaSchema = new mongoose.Schema({
  //id: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ruolo: { type: String, required: true, default: "attivita" },
  nomeAttivita: { type: String, required: true },
  indirizzo: { type: String, required: true },
  telefono: { type: Number, required: true },
  partitaIVA: { type: Number, required: true},
  iban: { type: String, required: true },
  eventiPubblicati: [{ type: Number }],
}, { collection: 'utenti' });
  
module.exports = mongoose.model('Attivita', attivitaSchema);