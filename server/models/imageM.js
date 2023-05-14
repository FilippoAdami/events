const mongoose = require('mongoose');

const immagineSchema = new mongoose.Schema({
    content : {type : Buffer, required: true},
    name : {type: String, required: true}
})

module.export = mongoose.Model('Immagine',immagineSchema);