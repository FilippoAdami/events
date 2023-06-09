const request = require('supertest');
const app = require('../server');
const Attivita = require('../models/eventoM');
const Persona = require('../models/personaM');


//REGISTRAZIONE
describe('POST /api/attivita/register', () => {
    test('given all tha attributes, should create a new Attivita with the attribute "ruolo" = "attivita" and should return status 201', async () => {
       
        let attivitaTest = {
            email: "testAttivita@test.it",
            password: "testAttivita",
            nomeAttivita: "test",
            indirizzo: "test",
            telefono: 1,
            partitaIVA: 1,
            iban: "1"
        }
        
        const response = await request(app).post('/api/attivita/register').send(attivitaTest)
        console.log(response.body);

        expect(response.status).toBe(201);
        expect(response.body.attivita.ruolo).toBe("attivita")
        expect(response.body.message).toBe("utente registrato")

        let id = response.body.attivita._id
        await request(app).delete(`/api/attivita/${id}`)
    });

    test('should return error 400 if an attribute is not supplied, in this case "nome" ', async () => {
       
        let attivitaTest = {
            email: "testAttivita@test.it",
            password: "testAttivita",
            nomeAttivita: "test",
            indirizzo: "test",
            telefono: 1,
            partitaIVA: 1,
            iban: "1"
        }
        
        const response = await request(app).post('/api/persona/register').send(attivitaTest)
        console.log(response.body);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("errore registrazione")
    });

    test('should return error 400 if there is a duplicate of the attribute email in the database', async () => {
       
        let attivitaTest1 = {
            email: "testAttivita@test.it",
            password: "testAttivita",
            nomeAttivita: "test",
            indirizzo: "test",
            telefono: 1,
            partitaIVA: 1,
            iban: "1"
        }

        let attivitaTest2 = {
            email: "testAttivita@test.it",
            password: "testAttivita",
            nomeAttivita: "test",
            indirizzo: "test",
            telefono: 1,
            partitaIVA: 1,
            iban: "1"
        }
        
        const registrazione = await request(app).post('/api/attivita/register').send(attivitaTest1)
        console.log(registrazione.body);

        const response = await request(app).post('/api/attivita/register').send(attivitaTest2)
        console.log(response.body);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("errore registrazione")
    });
})


//GET ALL
describe('GET /api/attivita', () => {
    test('should return all "attivita" ', async () => {
      
        const response = await request(app).get('/api/attivita')
        expect(response.status).toBe(200)
    });
  
    test('should return 500 if an error occurs', async () => {
      
        jest.spyOn(Attivita, 'find').mockImplementationOnce(() => {
            throw new Error('error');
        });
  
        const response = await request(app).get(`/api/attivita`)
        expect(response.status).toBe(500)
        expect(response.body.message).toBe('error')
    });
});


//GET BY ID
describe('GET /api/attivita:id', () => {
    test('returns the user with matching id and return status 200" ', async () => {

        let attivitaTest = {
            email: "testAttivita@test.it",
            password: "testAttivita",
            nomeAttivita: "test",
            indirizzo: "test",
            telefono: 1,
            partitaIVA: 1,
            iban: "1"
        }

        const registrazione = await request(app).post('/api/attivita/register').send(attivitaTest)
        console.log(registrazione.body)

        let id = registrazione.body.attivita._id
      
        const response = await request(app).get(`/api/attivita/${id}`)
        expect(response.status).toBe(200)

        await request(app).delete(`/api/attivita/${id}`)  
    });

    test('should return 500 if id does not exist', async () => {

        let id = "errore"
  
        const response = await request(app).get(`/api/attivita/${id}`)
        expect(response.status).toBe(500)
        expect(response.body.message).toBe('error')
    });

    test('should return 500 if an error occurs', async () => {
      
        jest.spyOn(Attivita, 'find').mockImplementationOnce(() => {
            throw new Error('error');
        });
  
        const response = await request(app).get(`/api/attivita/:id`)
        expect(response.status).toBe(500)
        expect(response.body.message).toBe('error')
    });
});


describe('PUT /api/attivita:id', () => {

    test('should modify the user with matching id and return status 200 ', async () => {
        
        let attivitaTest = {
            email: "testAttivita@test.it",
            password: "testAttivita",
            nomeAttivita: "test",
            indirizzo: "test",
            telefono: 1,
            partitaIVA: 1,
            iban: "1"
        }

        let modifica = {
            email: "testAttivita@prova.it",
            password: "prova",
            nomeAttivita: "prova",
            indirizzo: "prova",
            telefono: 2,
            partitaIVA: 2,
            iban: "2"
        }

        const registrazione = await request(app).post('/api/attivita/register').send(attivitaTest)
        console.log(registrazione.body)

        let id = registrazione.body.attivita._id

        const response = await request(app).put(`/api/attivita/${id}`).send(modifica)

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("utente modificato")

        await request(app).delete(`/api/attivita/${id}`)
    })

    test('should return 500 if id does not exist', async () => {

        let id = "errore"
  
        const response = await request(app).put(`/api/attivita/${id}`)
        expect(response.status).toBe(500)
        expect(response.body.message).toBe('error')
    });

    test('should return 500 if an error occurs', async () => {
      
        jest.spyOn(Attivita, 'find').mockImplementationOnce(() => {
            throw new Error('error');
        });
  
        const response = await request(app).put(`/api/attivita/:id`)
        expect(response.status).toBe(500)
        expect(response.body.message).toBe('error')
    });
})  


describe('DELETE /api/attivita:id', () => {

    test('should delete the user with matching id and return status 200', async () => {
        
        let attivitaTest = {
            email: "testAttivita@test.it",
            password: "testAttivita",
            nomeAttivita: "test",
            indirizzo: "test",
            telefono: 1,
            partitaIVA: 1,
            iban: "1"
        }

        const registrazione = await request(app).post('/api/attivita/register').send(attivitaTest)
        console.log(registrazione.body)

        let id = registrazione.body.attivita._id

        const response = await request(app).delete(`/api/attivita/${id}`)

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("utente correttamente rimosso")

        await request(app).delete(`/api/attivita/${id}`)
    })

    test('should return 500 if id does not exist', async () => {

        let id = "errore"
  
        const response = await request(app).put(`/api/attivita/${id}`)
        expect(response.status).toBe(500)
        expect(response.body.message).toBe('error')
    });

    test('should return 500 if an error occurs', async () => {
      
        jest.spyOn(Attivita, 'find').mockImplementationOnce(() => {
            throw new Error('error');
        });
  
        const response = await request(app).delete(`/api/attivita/:id`)
        expect(response.status).toBe(500)
        expect(response.body.message).toBe('error')
    });
})  