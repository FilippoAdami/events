/* 
ADS model:
ID int (chiave primaria)
ID pubblicatore int (chiave esterna)
titolo String (max 30 caratteri)
descrizione String (max 120 caratteri)
data Date
ora Time
luogo int (14 caratteri)
contatto String (max 30 caratteri)
click: int
apparizioni: int

APIs:
GET: getAds (/), getAdById (../:adID), getAdsByUser (/profile) 
POST: postNewAd (../:newAd),
PUT: modifyAd (../:adID), 
DELETE: deleteAd (../:adID),
*/
const mongoose = require('mongoose');

const annuncioSchema = new mongoose.Schema({
    //id: { type: Number, required: true },
    id_publisher: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    time: { type: Number, required: true },
    place: { type: String, required: false },
    contact: { type: String, required: false },
    clicks: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
}, { collection: 'ads' });

module.exports = mongoose.model('Annuncio', annuncioSchema);
