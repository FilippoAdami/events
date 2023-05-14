const mongoose = require('mongoose');

const amministratoreSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    mail : {type : String, required : true},
    password : {type : String, required: true},
}, { collection: 'amministratori' });

const amministratoreM = new mongoose.model('amministratoreM',amministratoreSchema);

//const filter = {id : 'AAAA'};
//const newMail = {mail : "newMAil" };
//
//
//amministratoreM.updateOne(filter,newMail);

//amministratoreSchema.methods.modificaDati(mail) = function modificaDati(mail)
//{
//    console.log("this function will modify data according to the admin's decisions");
//
//    //cambio della mai
//}


module.exports = mongoose.model('AmministratoreM', amministratoreSchema);
