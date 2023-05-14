const express = require('express');
const router = express.Router;
const Annuncio = require('../models/amministratoreM.js');

// API to modify data

router.put('/ammAPI/:id/:target',async (req,res) => 
{
    const ammData = AmministratoreM.find(req.params.id);

    if(!ammData)
    {
        res.status(404).send("error no admin with this id");
    }
    else
    {
        const updateKey = req.params.target;
        const updateValue =  req.body.targetValue ;
        AmministratoreM.findOneAndUpdate({id : req.params.id},{ updateKey : updateValue});
        console.log("request accepted, changes should have been made");
        res.status(200).send("infos updated");
    }


});

