const mongoose = require('mongoose');

const attivitaSchema = new mongoose.Schema({
  //id: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nomeAttivita: { type: String, required: true },
  indirizzo: { type: String, required: true },
  telefono: { type: String, required: true },
  partitaIVA: { type: Number, required: true},
  iban: { type: String, required: true },
  eventiPubblicati: [{ type: Number }]
}, { collection: 'users' });
  
module.exports = mongoose.model('Attivita', attivitaSchema);