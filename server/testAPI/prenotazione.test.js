const request = require('supertest');
const app = require('../server');


describe("POST /api/persona/:id/prenotazioni", () => {

    test("should add in array prenotazioni the id of the event pass in the request", async() => {

        //token valido ed ID dell'utente Test (token settato che non scada mai per scopi di test) 
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlZjBkZWYxMmQ4ZmQxOGQ1YjM2YjIiLCJlbWFpbCI6InV0ZW50ZVRlc3RAdGVzdC5pdCIsInBhc3N3b3JkIjoiJDJiJDEwJGpTWENDRHI0SWxQQkRsZ3BTRWFYQU9MY05YejNiTzB0Rk5FeVJ0QnRrbHEwazBBeS5icHdTIiwicnVvbG8iOiJwZXJzb25hIiwibm9tZSI6InRlc3QiLCJjb2dub21lIjoidGVzdCIsInRlbGVmb25vIjowLCJkYXRhTmFzY2l0YSI6IjE5OTktMTItMzFUMjM6MDA6MDAuMDAwWiIsImV2ZW50aVB1YmJsaWNhdGkiOlsiNjQ4MGFhZTMwMDlmZmNlODAzNDhmMWFiIl0sInByZW5vdGF6aW9uaSI6WyI2NDY5ZGM2NTgwNTU4MTgxY2Q4OTY4ZmIiXSwiYW5udW5jaVB1YmJsaWNhdGkiOltdLCJfX3YiOjAsImlhdCI6MTY4NjIzNTUwM30.RPUoc26pvh2UVwqtNPBDonMYLFM40UXSmMu0FzCnxbg'
        let id_utente_test = "647ef0def12d8fd18d5b36b2"

        let evento = await request(app).get(`/api/eventi/6469e719edbf5af71c5bf5fa`)     // prendo un evento esistente ( festa Mesiano )  
        let eventoID_value = evento.body._id                                            // ne ricavo l'ID 

        const response = await request(app).post(`/api/persona/${id_utente_test}/prenotazioni`).set(`x-access-token`,token).send({eventoID : eventoID_value});
        
        let utente = await request(app).get(`/api/persona/647ef0def12d8fd18d5b36b2`)    // prendo l'utente appena modificato per fare le varie verifiche
        let eventoAgg = await request(app).get(`/api/eventi/6469e719edbf5af71c5bf5fa`)     // prendo un evento esistente 

        console.log(response.body)

        expect(response.status).toBe(201)
        expect(utente.body.prenotazioni).toContain(eventoID_value)
        expect(eventoAgg.body.utentiPrenotati).toContain(id_utente_test)

        // cancello la prenotazione dal database per non riempirlo di dati di testing
        await request(app).delete(`/api/persona/${id_utente_test}/prenotazioni/${eventoID_value}`).set(`x-access-token`,token)
    })


    // Test prenotazione da parte di attivita
    test("should return 403 if an attvità account try to booking", async() => {

        //token valido ed ID dell'utente attivita (token settato che non scada mai per scopi di test) 
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlZjBkZWYxMmQ4ZmQxOGQ1YjM2YjIiLCJlbWFpbCI6InV0ZW50ZVRlc3RAdGVzdC5pdCIsInBhc3N3b3JkIjoiJDJiJDEwJGpTWENDRHI0SWxQQkRsZ3BTRWFYQU9MY05YejNiTzB0Rk5FeVJ0QnRrbHEwazBBeS5icHdTIiwicnVvbG8iOiJwZXJzb25hIiwibm9tZSI6InRlc3QiLCJjb2dub21lIjoidGVzdCIsInRlbGVmb25vIjowLCJkYXRhTmFzY2l0YSI6IjE5OTktMTItMzFUMjM6MDA6MDAuMDAwWiIsImV2ZW50aVB1YmJsaWNhdGkiOlsiNjQ4MGFhZTMwMDlmZmNlODAzNDhmMWFiIl0sInByZW5vdGF6aW9uaSI6WyI2NDY5ZGM2NTgwNTU4MTgxY2Q4OTY4ZmIiXSwiYW5udW5jaVB1YmJsaWNhdGkiOltdLCJfX3YiOjAsImlhdCI6MTY4NjIzNTUwM30.RPUoc26pvh2UVwqtNPBDonMYLFM40UXSmMu0FzCnxbg'
        let id_utente_test = "6480eae9877fe1e3f1755b68"

        let evento = await request(app).get(`/api/eventi/6469e719edbf5af71c5bf5fa`)     // prendo un evento esistente ( festa Mesiano )  
        let eventoID_value = evento.body._id                                            // ne ricavo l'ID 

        await request(app).post(`/api/persona/${id_utente_test}/prenotazioni`).set(`x-access-token`,token).send({eventoID : eventoID_value});
        const response = await request(app).post(`/api/persona/${id_utente_test}/prenotazioni`).set(`x-access-token`,token).send({eventoID : eventoID_value});
        
        expect(response.status).toBe(403)
        expect(response.body.message).toBe('Le attivita non possono prenotarsi')

        await request(app).delete(`/api/persona/${id_utente_test}/prenotazioni/${eventoID_value}`).set(`x-access-token`,token)
        
    })


    // Test prenotazione ad un evento gia prenotato
    test("should return 403 if the utente is already booked for that event", async() => {

        //token valido ed ID dell'utente attivita (token settato che non scada mai per scopi di test) 
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlZjBkZWYxMmQ4ZmQxOGQ1YjM2YjIiLCJlbWFpbCI6InV0ZW50ZVRlc3RAdGVzdC5pdCIsInBhc3N3b3JkIjoiJDJiJDEwJGpTWENDRHI0SWxQQkRsZ3BTRWFYQU9MY05YejNiTzB0Rk5FeVJ0QnRrbHEwazBBeS5icHdTIiwicnVvbG8iOiJwZXJzb25hIiwibm9tZSI6InRlc3QiLCJjb2dub21lIjoidGVzdCIsInRlbGVmb25vIjowLCJkYXRhTmFzY2l0YSI6IjE5OTktMTItMzFUMjM6MDA6MDAuMDAwWiIsImV2ZW50aVB1YmJsaWNhdGkiOlsiNjQ4MGFhZTMwMDlmZmNlODAzNDhmMWFiIl0sInByZW5vdGF6aW9uaSI6WyI2NDY5ZGM2NTgwNTU4MTgxY2Q4OTY4ZmIiXSwiYW5udW5jaVB1YmJsaWNhdGkiOltdLCJfX3YiOjAsImlhdCI6MTY4NjIzNTUwM30.RPUoc26pvh2UVwqtNPBDonMYLFM40UXSmMu0FzCnxbg'
        let id_utente_test = "647ef0def12d8fd18d5b36b2"

        let evento = await request(app).get(`/api/eventi/6469e719edbf5af71c5bf5fa`)     // prendo un evento esistente ( festa Mesiano )  
        let eventoID_value = evento.body._id                                            // ne ricavo l'ID 

        //await request(app).post(`/api/persona/${id_utente_test}/prenotazioni`).set(`x-access-token`,token).send({eventoID : eventoID_value});
        const response = await request(app).post(`/api/persona/${id_utente_test}/prenotazioni`).set(`x-access-token`,token).send({eventoID : eventoID_value});
        
       
        expect(response.status).toBe(403)
        expect(response.body.message).toBe('Gia prenotato a questo evneto')
        
    })


    // Test prenotazione per la persona id mediante un token non corrispondente
    test("should return 403 if persona id not corrispond to the token", async() => {

        //token valido dell'utente Test (token settato che non scada mai per scopi di test) 
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlZjBkZWYxMmQ4ZmQxOGQ1YjM2YjIiLCJlbWFpbCI6InV0ZW50ZVRlc3RAdGVzdC5pdCIsInBhc3N3b3JkIjoiJDJiJDEwJGpTWENDRHI0SWxQQkRsZ3BTRWFYQU9MY05YejNiTzB0Rk5FeVJ0QnRrbHEwazBBeS5icHdTIiwicnVvbG8iOiJwZXJzb25hIiwibm9tZSI6InRlc3QiLCJjb2dub21lIjoidGVzdCIsInRlbGVmb25vIjowLCJkYXRhTmFzY2l0YSI6IjE5OTktMTItMzFUMjM6MDA6MDAuMDAwWiIsImV2ZW50aVB1YmJsaWNhdGkiOlsiNjQ4MGFhZTMwMDlmZmNlODAzNDhmMWFiIl0sInByZW5vdGF6aW9uaSI6WyI2NDY5ZGM2NTgwNTU4MTgxY2Q4OTY4ZmIiXSwiYW5udW5jaVB1YmJsaWNhdGkiOltdLCJfX3YiOjAsImlhdCI6MTY4NjIzNTUwM30.RPUoc26pvh2UVwqtNPBDonMYLFM40UXSmMu0FzCnxbg'
        let id_utente_test = "6471fccf2ff11c3b27c3e243"     // ID valido di un account diverso da quello di test

        let evento = await request(app).get(`/api/eventi/6469e719edbf5af71c5bf5fa`)     // prendo un evento esistente ( festa Mesiano )  
        let eventoID_value = evento.body._id                                            // ne ricavo l'ID 

        const response = await request(app).post(`/api/persona/${id_utente_test}/prenotazioni`).set(`x-access-token`,token).send({eventoID : eventoID_value});
        
       
        expect(response.status).toBe(403)
        expect(response.body.message).toBe('Unauthorized access')
        
    })

     // Test prenotazione non passando token
     test("should return 403 if the token isn't specify", async() => {

        let id_utente_test = "647ef0def12d8fd18d5b36b2"   

        let evento = await request(app).get(`/api/eventi/6469e719edbf5af71c5bf5fa`)     // prendo un evento esistente ( festa Mesiano )  
        let eventoID_value = evento.body._id                                            // ne ricavo l'ID 

        const response = await request(app).post(`/api/persona/${id_utente_test}/prenotazioni`).send({eventoID : eventoID_value});
        
       
        expect(response.status).toBe(403)
        expect(response.body.errormessage).toBe("Token assente")
        
    })

    // Test prenotazione passando token non valido 
    test("should return 403 if the token is wronk", async() => {

        //token non valido
        let token = "error"
        let id_utente_test = "647ef0def12d8fd18d5b36b2"   

        let evento = await request(app).get(`/api/eventi/6469e719edbf5af71c5bf5fa`)     // prendo un evento esistente ( festa Mesiano )  
        let eventoID_value = evento.body._id                                            // ne ricavo l'ID 

        const response = await request(app).post(`/api/persona/${id_utente_test}/prenotazioni`).set(`x-access-token`,token).send({eventoID : eventoID_value});
        
        expect(response.status).toBe(403)
        expect(response.body.message).toBe("Unauthorized access")
        
    })



    // Test prenotazione senza id event nella richiesta
    test("should return 400 if isn't specify the id event in the request", async() => {

        //token valido ed ID dell'utente Test (token settato che non scada mai per scopi di test) 
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlZjBkZWYxMmQ4ZmQxOGQ1YjM2YjIiLCJlbWFpbCI6InV0ZW50ZVRlc3RAdGVzdC5pdCIsInBhc3N3b3JkIjoiJDJiJDEwJGpTWENDRHI0SWxQQkRsZ3BTRWFYQU9MY05YejNiTzB0Rk5FeVJ0QnRrbHEwazBBeS5icHdTIiwicnVvbG8iOiJwZXJzb25hIiwibm9tZSI6InRlc3QiLCJjb2dub21lIjoidGVzdCIsInRlbGVmb25vIjowLCJkYXRhTmFzY2l0YSI6IjE5OTktMTItMzFUMjM6MDA6MDAuMDAwWiIsImV2ZW50aVB1YmJsaWNhdGkiOlsiNjQ4MGFhZTMwMDlmZmNlODAzNDhmMWFiIl0sInByZW5vdGF6aW9uaSI6WyI2NDY5ZGM2NTgwNTU4MTgxY2Q4OTY4ZmIiXSwiYW5udW5jaVB1YmJsaWNhdGkiOltdLCJfX3YiOjAsImlhdCI6MTY4NjIzNTUwM30.RPUoc26pvh2UVwqtNPBDonMYLFM40UXSmMu0FzCnxbg'
        let id_utente_test = "647ef0def12d8fd18d5b36b2"

        
        const response = await request(app).post(`/api/persona/${id_utente_test}/prenotazioni`).set(`x-access-token`,token);
       
        expect(response.status).toBe(400)
        expect(response.body.message).toBe('evento ID assente')
        
    })


    // Test prenotazione ad un evento non esistente
    test("should return 404 if the event don't exist", async() => {

         //token valido ed ID dell'utente Test (token settato che non scada mai per scopi di test) 
         let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlZjBkZWYxMmQ4ZmQxOGQ1YjM2YjIiLCJlbWFpbCI6InV0ZW50ZVRlc3RAdGVzdC5pdCIsInBhc3N3b3JkIjoiJDJiJDEwJGpTWENDRHI0SWxQQkRsZ3BTRWFYQU9MY05YejNiTzB0Rk5FeVJ0QnRrbHEwazBBeS5icHdTIiwicnVvbG8iOiJwZXJzb25hIiwibm9tZSI6InRlc3QiLCJjb2dub21lIjoidGVzdCIsInRlbGVmb25vIjowLCJkYXRhTmFzY2l0YSI6IjE5OTktMTItMzFUMjM6MDA6MDAuMDAwWiIsImV2ZW50aVB1YmJsaWNhdGkiOlsiNjQ4MGFhZTMwMDlmZmNlODAzNDhmMWFiIl0sInByZW5vdGF6aW9uaSI6WyI2NDY5ZGM2NTgwNTU4MTgxY2Q4OTY4ZmIiXSwiYW5udW5jaVB1YmJsaWNhdGkiOltdLCJfX3YiOjAsImlhdCI6MTY4NjIzNTUwM30.RPUoc26pvh2UVwqtNPBDonMYLFM40UXSmMu0FzCnxbg'
         let id_utente_test = "647ef0def12d8fd18d5b36b2" 
    
        let eventoID_value = "000ef0def12d8fd18d5b36b0"                  // prendo un ID evento non esistente   

        const response = await request(app).post(`/api/persona/${id_utente_test}/prenotazioni`).set(`x-access-token`,token).send({eventoID : eventoID_value});
        
       
        expect(response.status).toBe(404)
        expect(response.body.message).toBe('Evento non trovato')
        
    })

     // Test prenotazione per un utente che non esistente
     test("should return 404 if the utente don't exist", async() => {

        //token valido dell'utente Test (token settato che non scada mai per scopi di test) 
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlZjBkZWYxMmQ4ZmQxOGQ1YjM2YjIiLCJlbWFpbCI6InV0ZW50ZVRlc3RAdGVzdC5pdCIsInBhc3N3b3JkIjoiJDJiJDEwJGpTWENDRHI0SWxQQkRsZ3BTRWFYQU9MY05YejNiTzB0Rk5FeVJ0QnRrbHEwazBBeS5icHdTIiwicnVvbG8iOiJwZXJzb25hIiwibm9tZSI6InRlc3QiLCJjb2dub21lIjoidGVzdCIsInRlbGVmb25vIjowLCJkYXRhTmFzY2l0YSI6IjE5OTktMTItMzFUMjM6MDA6MDAuMDAwWiIsImV2ZW50aVB1YmJsaWNhdGkiOlsiNjQ4MGFhZTMwMDlmZmNlODAzNDhmMWFiIl0sInByZW5vdGF6aW9uaSI6WyI2NDY5ZGM2NTgwNTU4MTgxY2Q4OTY4ZmIiXSwiYW5udW5jaVB1YmJsaWNhdGkiOltdLCJfX3YiOjAsImlhdCI6MTY4NjIzNTUwM30.RPUoc26pvh2UVwqtNPBDonMYLFM40UXSmMu0FzCnxbg'
        let id_utente_test = "000ef0def12d8fd18d5b36b0"             // ID Non valido 
   
        let evento = await request(app).get(`/api/eventi/6469e719edbf5af71c5bf5fa`)     // prendo un evento esistente ( festa Mesiano )  
        let eventoID_value = evento.body._id                                            // ne ricavo l'ID 
 

       const response = await request(app).post(`/api/persona/${id_utente_test}/prenotazioni`).set(`x-access-token`,token).send({eventoID : eventoID_value});
       
      
       expect(response.status).toBe(404)
       expect(response.body.message).toBe('Utente non trovato')
       
   })


    


})


describe("DELETE /api/persona/:id/prenotazioni/idEvento", () => {

    test("should remove in array prenotazioni the id of the event pass in the request", async() => {

        //token valido ed ID dell'utente Test (token settato che non scada mai per scopi di test) 
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlZjBkZWYxMmQ4ZmQxOGQ1YjM2YjIiLCJlbWFpbCI6InV0ZW50ZVRlc3RAdGVzdC5pdCIsInBhc3N3b3JkIjoiJDJiJDEwJGpTWENDRHI0SWxQQkRsZ3BTRWFYQU9MY05YejNiTzB0Rk5FeVJ0QnRrbHEwazBBeS5icHdTIiwicnVvbG8iOiJwZXJzb25hIiwibm9tZSI6InRlc3QiLCJjb2dub21lIjoidGVzdCIsInRlbGVmb25vIjowLCJkYXRhTmFzY2l0YSI6IjE5OTktMTItMzFUMjM6MDA6MDAuMDAwWiIsImV2ZW50aVB1YmJsaWNhdGkiOlsiNjQ4MGFhZTMwMDlmZmNlODAzNDhmMWFiIl0sInByZW5vdGF6aW9uaSI6WyI2NDY5ZGM2NTgwNTU4MTgxY2Q4OTY4ZmIiXSwiYW5udW5jaVB1YmJsaWNhdGkiOltdLCJfX3YiOjAsImlhdCI6MTY4NjIzNTUwM30.RPUoc26pvh2UVwqtNPBDonMYLFM40UXSmMu0FzCnxbg'
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