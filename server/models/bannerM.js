const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    id_publisher: { type: Number, required : true},
    title: { type: String, required : true },
    descrizione: {type: String, required : true },
    image: {type: String, required: false},
    budget: { type: Number, default: 0 },
    link: { type: String, required : true },
    clicks: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    show: { type: Boolean, default: true}
}, { collection: 'banners' });


module.exports = mongoose.model('Banner', bannerSchema );