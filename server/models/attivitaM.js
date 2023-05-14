const mongoose = require('mongoose');

const attivitaSchema = new mongoose.Schema({
  //id: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  nomeAzienda: { type: String, required: true },
  indirizzo: { type: String, required: true },
  telefono: { type: String, required: true },
  partitaIVA: { type: Number, required: true},
  IBAN: { type: String, required: true },
  eventiPubblicati: [{ type: Number }]
}, { collection: 'attivita' });
  
module.exports = mongoose.model('Attivita', attivitaSchema);