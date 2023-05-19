const mongoose = require('mongoose');
const Segnalazione = require('../models/segnalazioneM');
const Persona = require('../models/personaM');


const eventoSchema = new mongoose.Schema({
    id_Evento : {type : Number , required : true},
    titolo : {type : String, required : true},
    data :{type : Date, required : true},
    ora : {type: Number, required : true }, // non sono convinto del tipo
    indirizzo : {type : String , required : true},
    descrizione : {type : String, required: false},
    immagini : [{type : String, required: false}], 
    costo : {type: Number, required : true},
    posti : {type : Number, required:  true}, // forse potrebbe essere facoltativo
    postiLiberi : {type : Number, required : true},
    visibilita : {type : Boolean , required: true},
    categoria : {type : String , required: false , enum : ['social life','sport','studio','svago','viaggi','business/progetti','cultura','arte','cinema','filosofia','altro']},
    pubblicatore : {type : String, required: true},
    utentiPrenotati : [{type : mongoose.Schema.Types.ObjectId, ref :"Persona"}] , // conterrà solo gli id degli utenti prenotati
    segnalato : {type : Boolean, required: true},
    segnalazioni : [Segnalazione.Schema]
}, {collection : 'eventi'} );

module.exports = mongoose.model('Evento', eventoSchema);