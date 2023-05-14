const mongoose = require('mongoose');

const bachecaSchema = new mongoose.Schema({
    numeroInserzioni : {type : Number, required : true},
    tipoInserzioni : {},
    frequPubblicita : {type : Number, required : true}
}, {collection : 'bacheca'});

module.exports = mongoose.model('Bacheca',bachecaSchema);
