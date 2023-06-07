const request = require('supertest');
const app = require('../server');
const Evento = require('../models/eventoM');
const Persona = require('../models/personaM')

describe("POST /api/persona/:id/prenotazioni", () => {

    test("should add in array prenotazioni the id of the event pass in the request", async() => {

        //token valido ed ID dell'utente Test (token settato che non scada mai per scopi di test) 
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"
        let id_utente_test = "647ef0def12d8fd18d5b36b2"

        let evento = await request(app).get(`/api/eventi/6469e719edbf5af71c5bf5fa`)     // prendo un evento esistente ( festa Mesiano )  
        let eventoID_value = evento.body._id                                            // ne ricavo l'ID 

        const response = await request(app).post(`/api/persona/${id_utente_test}/prenotazioni`).set(`x-access-token`,token).send({eventoID : eventoID_value});
        
        let utente = await request(app).get(`/api/persona/647ef0def12d8fd18d5b36b2`)    // prendo l'utente appena modificato per fare le varie verifiche
        let eventoAgg = await request(app).get(`/api/eventi/6469e719edbf5af71c5bf5fa`)     // prendo un evento esistente 

       
        expect(response.status).toBe(201)
        expect(utente.body.prenotazioni).toContain(eventoID_value)
        expect(eventoAgg.body.utentiPrenotati).toContain(id_utente_test)

        // cancello la prenotazione dal database per non riempirlo di dati di testing
        await request(app).delete(`/api/persona/${id_utente_test}/prenotazioni/${eventoID_value}`).set(`x-access-token`,token)
    })


    


})


describe("DELETE /api/persona/:id/prenotazioni/idEvento", () => {

    test("should remove in array prenotazioni the id of the event pass in the request", async() => {

        //token valido ed ID dell'utente Test (token settato che non scada mai per scopi di test) 
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"
        let id_utente_test = "647ef0def12d8fd18d5b36b2"

        let evento = await request(app).get(`/api/eventi/6469e719edbf5af71c5bf5fa`)     // prendo un evento esistente ( festa Mesiano )  
        let eventoID_value = evento.body._id                                            // ne ricavo l'ID 

        // creo la prenotazione da cancellare 
        await request(app).post(`/api/persona/${id_utente_test}/prenotazioni`).set(`x-access-token`,token).send({eventoID : eventoID_value});

        const response = await request(app).delete(`/api/persona/${id_utente_test}/prenotazioni/${eventoID_value}`).set(`x-access-token`,token);
        
        let utente = await request(app).get(`/api/persona/647ef0def12d8fd18d5b36b2`)    // prendo l'utente appena modificato per fare le varie verifiche
        let eventoAgg = await request(app).get(`/api/eventi/6469e719edbf5af71c5bf5fa`)     // prendo un evento esistente 

       
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('prenotazione cancellata')
    })


    


})