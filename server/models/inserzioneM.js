const mongoose = require('mongoose');

const inserzioneSchema = new mongoose.Schema({
    id_insezione: { type: Number, required: true },
    titolo : {type : String , required: true},
    data : { type : Date , required :true}
}, { collection: 'inserzioni' });
  
module.exports = mongoose.model('Inserzione', inserzioneSchema);