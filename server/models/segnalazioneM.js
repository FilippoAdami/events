const mongoose = require('mongoose');

const segnalazioneSchema = new mongoose.Schema({
    id_segnalazione :{type : Number, required : true},
    id_autore : {type : Number , required : true},
    info : {type : String}
},{collection : 'segnalazioni'});

module.export = mongoose.model('Segnalazione',segnalazioneSchema);