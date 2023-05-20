const mongoose = require('mongoose');

const AmministratoreSchema = new mongoose.Schema({
  //id: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ['super-user', 'moderatore', 'responsabile_pubblicita']
  }
}, { collection: 'administrators' });

const Amministratore = mongoose.model('Amministratore', AmministratoreSchema);

module.exports = Amministratore;