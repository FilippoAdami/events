const mongoose = require('mongoose');

const personaSchema = new mongoose.Schema({
  //id: {type: Number, required: true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  nome: { type: String, required: true },
  cognome: { type: String, required: true },
  telefono: { type: String, required: true },
  dataNascita: { type: Date, default: Date.now },
  eventiPubblicati: [{type: Number}],
  //prenotazioni: {type: lista},
  //annunciPubblicati: {type: lista}
}, { collection: 'users' });
  
module.exports = mongoose.model('Persona', personaSchema);