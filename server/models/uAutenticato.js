const mongoose = require('mongoose')
const utenteAnonimoSchema = require('uAnonimo')

const utenteAutenticatoSchema = new mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  base: {type: utenteAnonimoSchema, required: true}
})

module.exports = mongoose.model('UtenteAutenticato', utenteAutenticato);


