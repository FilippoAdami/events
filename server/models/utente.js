const mongoose = require('mongoose');

class UtenteAnonimo{
    constructor(id){
      this.id = id;
    }
  }
  
  class UtenteAutenticato extends UtenteAnonimo{
    constructor(id, email, password){
      super(id);
      this.email = email;
      this.password = password;
    }
  }
  
  const utenteAnonimoSchema = new mongoose.Schema({
    id: {type: int, required: true}
  });
  
  const utenteAutenticatoSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    base: {type: utenteAnonimoSchema, required: true}
  })
  
  const UtenteAnonimoModel = mongoose.model('UtenteAnonimo', utenteAnonimoSchema);
  
  const UtenteAutenticatoModel = mongoose.model('UtenteAnonimo', utenteAnonimoSchema);
  
  module.exports = {
    UtenteAnonimo,
    UtenteAnonimoModel,
    UtenteAutenticato,
    UtenteAutenticatoModel,
    utenteAnonimoSchema
  };