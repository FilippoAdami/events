const express = require('express')
const router = express.Router()
const Banner = require('../models/bannerM.js')

const fs = require('fs')

//ritorna tutti i banner 
router.get('/banners', async (req, res) => {
    try {
        const banner = await Banner.find()
        res.json(banner)                             
    } catch (err) {
        res.status(500).json({ message: err.message })      //errore 500: c'è un errore nel server, nel nostro caso nel database
    }
})

//ritorna tutti i banner con show attivo
router.get('/banners/show_true', async (req, res) => {
    try {
        const banner = await Banner.find(
            { show : "true" }                               //filtro, solo i banner con attributo show true
        )                                
        res.json(banner)                             
    } catch (err) {
        res.status(500).json({ message: err.message })      //errore 500: c'è un errore nel server, nel nostro caso nel database
    }
})

//ritorna tutti i banner con show false
router.get('/banners/show_false', async (req, res) => {
    try {
        const banner = await Banner.find(
            { show : "false" }                               //filtro, solo i banner con attributo show false
        )                                
        res.json(banner)                             
    } catch (err) {
        res.status(500).json({ message: err.message })      //errore 500: c'è un errore nel server, nel nostro caso nel database
    }
})

//crea un oggetto banner
router.post('/banners', async (req, res) => { 
    
    const banner = new Banner(req.body);

    if(req.body.clicks && req.body.clicks != 0){            // controllo che non vengano creati nuovi banner con clicks diverso da zero
        banner.clicks = 0
        return res.json({ allert: "Non è possibile creare un nuovo banner con clicks != 0"})
    }

    if(req.body.views && req.body.views != 0){            // controllo che non vengano creati nuovi banner con views diverso da zero
        banner.views = 0
        return res.json({ allert: "Non è possibile creare un nuovo banner con views != 0"})
    }

    try {
        const newBanner = await banner.save()
        res.status(201).json(newBanner)                      //201: oggetto creato correttamente
    } catch (err) {
        res.status(400).json({ message: err.message })       //400: errore da parte del cliente
    }
})

    



//funzione che ritorna il banner con l'id corrispondente, utilizzata nei metodi sottostanti
async function getBanner(req, res, next) {
    let banner
    try {
      banner = await Banner.findById(req.params.id)
      if (banner == null) {
        return res.status(404).json({ message: 'Banner non trovato' })    
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })               //errore 500: c'è un errore nel server, nel nostro caso nel database
    }
  
    res.banner = banner    

    next()
}

//ritorna il banner con il parametro richiesto
router.get('/banners/:id', getBanner, (req, res) => {
    res.json(res.banner)
})

//Rimuove un oggetto banner
router.delete('/banners/:id', getBanner, async (req, res) => {
    try {
      await res.banner.deleteOne()
      res.json({ message: 'Banner correttamente rimosso' })
    } catch (err) {
      res.status(500).json({ message: err.message })                //errore 500: c'è un errore nel server, nel nostro caso nel database
    }
})

//Rimuove tuuti gli oggetto banner
router.delete('/banners', async (req, res) => {
    try {
      await Banner.deleteMany();
      res.json({ message: 'Banners correttamente rimossi' })
    } catch (err) {
      res.status(500).json({ message: err.message })                //errore 500: c'è un errore nel server, nel nostro caso nel database
    }
})



//Modificare un banner pubblicitario
router.put('/banners/:id', getBanner, async (req, res) => {
    if (req.body != null) {
        Object.keys(req.body).forEach(dato => {  
            if(dato != "clicks" && dato != "views")   {             //Non possiamo modificare il numero di clicks o views
                res.banner[dato] = req.body[dato]                   //funzione che permette di sovrascrivere in nuovi dati su quelli vecchi
            }                                          
        })
    }
    try {
        const updatedBanner = await res.banner.save()
        res.json(updatedBanner)
    } catch (err) {
        res.status(400).json({ message: err.message })                //400: errore da parte del cliente   
    }
})

//Aggiornare gli attributi di un banner; l'utente avra gia fatto la get del banner; nell'update deve inserire quale azione fare

async function defineAction(req, res, next) {                               // funzione che si occupa della selezione della azione
    let banner = res.banner
    const action = req.body.action
    try {

        // Controlla che esista il parametro action nella richiesta
        if(!action){                                                        
            return res.status(400).json({ message: "elemento di update assente"}) 
        }

        //Verifica che azione di update, ed individua azioni non permesse
        if(req.body.action == "up_views"){                                  
            banner.$inc('views',1);
        }
        else if(req.body.action == "up_clicks"){
            banner.$inc('clicks',1);
        }
        else if(req.body.action == "inv_show"){
            banner.show = !banner.show;
        }
        else{
            return res.status(406).json({ message: "Richiesta di update incorretta, o non permessa"})   //406: errore da parte del cliente Not Acetable
        }

    } catch (err) {
      return res.status(400).json({ message: err.message })                 //400: errore da parte del cliente
    }
  
    res.banner = banner    

    next()
}

router.patch('/banners/:id', getBanner,defineAction, async (req, res) => {
    let banner = res.banner;
    res.json.message = res.json.message + " passato per patch"
    try{
        await banner.save();                                                // salva i campi aggiornati 
        res.status(200)
    }catch(err){
        res.status(500).json({ message: err.message })                      //errore 500: c'è un errore nel server, nel nostro caso nel database
    }
});

module.exports = router;
