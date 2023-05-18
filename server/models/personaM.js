const mongoose = require('mongoose');

const personaSchema = new mongoose.Schema({
  //id: {type: Number, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nome: { type: String, required: true },
  cognome: { type: String, required: true },
  telefono: { type: String, required: true },
  dataNascita: { type: Date, required: true},
  eventiPubblicati: [{type: Number}],
  prenotazioni: [{type: Number}],
  annunciPubblicati: [{type: Number}]
}, { collection: 'users' });
  
module.exports = mongoose.model('Persona', personaSchema);