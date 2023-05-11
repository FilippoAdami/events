const mongoose = require('mongoose');

const utenteAnonimoSchema = new mongoose.Schema({
  id: {type: Number, required: true}
})
  
module.exports = utenteAnonimoSchema;

