const request = require('supertest');
const app = require('../server');
const Attivita = require('../models/eventoM');
const Persona = require('../models/personaM');


//REGISTRAZIONE
describe('POST /api/persona/register', () => {
    test('given all tha attributes, should create a new Persona with the attribute "ruolo" = "persona" and should return status 201', async () => {
       
        let personaTest = {
            email: "testPersona@test.it",
            password: "testPersona",
            nome: "test",
            cognome: "test",
            telefono: 1,
            dataNascita: "01/01/2000"
        }
        
        const response = await request(app).post('/api/persona/register').send(personaTest)
        console.log(response.body);

        expect(response.status).toBe(201);
        expect(response.body.persona.ruolo).toBe("persona")
        expect(response.body.message).toBe("utente registrato")

        let id = response.body.persona._id
        await request(app).delete(`/api/persona/${id}`)
    });

    test('should return error 400 if an attribute is not supplied, in this case "nome" ', async () => {
       
        let personaTest = {
            email: "testPersona@test.it",
            password: "testPersona",
            cognome: "test",
            telefono: 1,
            dataNascita: "01/01/2000"
        }
        
        const response = await request(app).post('/api/persona/register').send(personaTest)
        console.log(response.body);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("errore registrazione")
    });

    test('should return error 400 if there is a duplicate of the attribute email in the database', async () => {
       
        let personaTest1 = {
            email: "testPersona@test.it",
            password: "testPersona",
            cognome: "test",
            telefono: 1,
            dataNascita: "01/01/2000"
        }

        let personaTest2 = {
            email: "testPersona@test.it",
            password: "testPersona",
            cognome: "test",
            telefono: 1,
            dataNascita: "01/01/2000"
        }
        
        const registrazione = await request(app).post('/api/persona/register').send(personaTest1)
        console.log(registrazione.body);

        const response = await request(app).post('/api/persona/register').send(personaTest2)
        console.log(response.body);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("errore registrazione")
    });
})


//GET ALL
describe('GET /api/persona', () => {
    test('should return all "persona" ', async () => {
      
        const response = await request(app).get('/api/persona')
        expect(response.status).toBe(200)
    });
  
    test('should return 500 if an error occurs', async () => {
      
        jest.spyOn(Persona, 'find').mockImplementationOnce(() => {
            throw new Error('error');
        });
  
        const response = await request(app).get('/api/persona')
        expect(response.status).toBe(500)
        expect(response.body.message).toBe('error')
    });
});


//GET BY ID
describe('GET /api/persona7:id', () => {
    test('returns the user with matching id and return status 200" ', async () => {

        let personaTest = {
            email: "testPersona@test.it",
            password: "testPersona",
            nome: "test",
            cognome: "test",
            telefono: 1,
            dataNascita: "01/01/2000"
        }

        const registrazione = await request(app).post('/api/persona/register').send(personaTest)
        console.log(registrazione.body)

        let id = registrazione.body.persona._id
      
        const response = await request(app).get(`/api/persona/${id}`)
        expect(response.status).toBe(200)

        await request(app).delete(`/api/persona/${id}`)  
    });

    test('should return 500 if id does not exist', async () => {

        let id = "errore"
  
        const response = await request(app).get(`/api/persona/${id}`)
        expect(response.status).toBe(500)
        expect(response.body.message).toBe('error')
    });

    test('should return 500 if an error occurs', async () => {
      
        jest.spyOn(Persona, 'find').mockImplementationOnce(() => {
            throw new Error('error');
        });
  
        const response = await request(app).get(`/api/persona/:id`)
        expect(response.status).toBe(500)
        expect(response.body.message).toBe('error')
    });
});


describe('PUT /api/persona:id', () => {

    test('should modify the user with matching id and return status 200 ', async () => {
        
        let personaTest = {
            email: "testPersona@test.it",
            password: "testPersona",
            nome: "test",
            cognome: "test",
            telefono: 1,
            dataNascita: "01/01/2000"
        }

        let modifica = {
            email: "testPersona@2.it",
            password: "prova",
            nome: "prova",
            cognome: "prova",
            telefono: 2,
            dataNascita: "01/01/1999"
        }

        const registrazione = await request(app).post('/api/persona/register').send(personaTest)
        console.log(registrazione.body)

        let id = registrazione.body.persona._id

        const response = await request(app).put(`/api/persona/${id}`).send(modifica)

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("utente modificato")

        await request(app).delete(`/api/persona/${id}`)
    })

    test('should return 500 if id does not exist', async () => {

        let id = "errore"
  
        const response = await request(app).put(`/api/persona/${id}`)
        expect(response.status).toBe(500)
        expect(response.body.message).toBe('error')
    });

    test('should return 500 if an error occurs', async () => {
      
        jest.spyOn(Persona, 'find').mockImplementationOnce(() => {
            throw new Error('error');
        });
  
        const response = await request(app).put(`/api/persona/:id`)
        expect(response.status).toBe(500)
        expect(response.body.message).toBe('error')
    });
})  


describe('DELETE /api/persona:id', () => {

    test('should delete the user with matching id and return status 200', async () => {
        
        let personaTest = {
            email: "testPersona@test.it",
            password: "testPersona",
            nome: "test",
            cognome: "test",
            telefono: 1,
            dataNascita: "01/01/2000"
        }

        const registrazione = await request(app).post('/api/persona/register').send(personaTest)
        console.log(registrazione.body)

        let id = registrazione.body.persona._id

        const response = await request(app).delete(`/api/persona/${id}`)

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("utente correttamente rimosso")

        await request(app).delete(`/api/persona/${id}`)
    })

    test('should return 500 if id does not exist', async () => {

        let id = "errore"
  
        const response = await request(app).put(`/api/persona/${id}`)
        expect(response.status).toBe(500)
        expect(response.body.message).toBe('error')
    });

    test('should return 500 if an error occurs', async () => {
      
        jest.spyOn(Persona, 'find').mockImplementationOnce(() => {
            throw new Error('error');
        });
  
        const response = await request(app).put(`/api/persona/:id`)
        expect(response.status).toBe(500)
        expect(response.body.message).toBe('error')
    });
})  