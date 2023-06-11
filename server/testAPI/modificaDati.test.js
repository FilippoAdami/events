const request = require('supertest');
const app = require('../server');

//PERSONA

describe('PATCH /api/persona', () => {

    test('given a new email attribute and a correctly logged in user "persona", it should change the email attribute and return status 200', async () => {
        
        let personaTest = {
            email: "testPersona@test.it",
            password: "testPersona",
            nome: "test",
            cognome: "test",
            telefono: 1,
            dataNascita: "01/01/2000"
        }

        let loginTest = {
            email: "testPersona@test.it",
            password: "testPersona"
        }

        let data = {
            email: "modifica@test.it",
            password: "modifica",
            nome: "modifica",
            cognome: "modifica",
            telefono: 1,
            dataNascita: "10/10/2000"
        }

        let modifica = {
            data
        }

        const registrazione = await request(app).post('/api/persona/register').send(personaTest)
        console.log(registrazione.body)

        const login = await request(app).post('/api/login').send(loginTest)
        console.log(login.body)

        let token = login.body.token;

        const response = await request(app).patch('/api/persona').set(`x-access-token`, token).send(modifica)
        console.log(response.body)

        expect(response.status).toBe(200);
        expect(response.body.auth).toBe(true);
        expect(response.body.message).toBe("dati modificati")

        let id = registrazione.body.persona._id
        await request(app).delete(`/api/persona/${id}`)
    })

    test('given a user "persona" with non-existing token, it should return status 403', async () => {

        let personaTest = {
            email: "testPersona@test.it",
            password: "testPersona",
            nome: "test",
            cognome: "test",
            telefono: 1,
            dataNascita: "01/01/2000"
        }

        let loginTest = {
            email: "testPersona@test.it",
            password: "testPersona"
        }

        let data = {
            email: "modifica@test.it",
            password: "modifica",
            nome: "modifica",
            cognome: "modifica",
            telefono: 1,
            dataNascita: "10/10/2000"
        }

        let modifica = {
            data
        }

        const registrazione = await request(app).post('/api/persona/register').send(personaTest)
        console.log(registrazione.body)

        const login = await request(app).post('/api/login').send(loginTest)
        console.log(login.body)

        const response = await request(app).patch('/api/persona').send(modifica)
        
        expect(response.status).toBe(403);
        expect(response.body.errormessage).toBe("Token assente")

        // rimuovo l'evento creato in fase di testing 
        let id = registrazione.body.persona._id
        await request(app).delete(`/api/persona/${id}`)
    })

    test('given a user "persona" with incorrect token, it should return status 403', async () => {

        let personaTest = {
            email: "testPersona@test.it",
            password: "testPersona",
            nome: "test",
            cognome: "test",
            telefono: 1,
            dataNascita: "01/01/2000"
        }

        let loginTest = {
            email: "testPersona@test.it",
            password: "testPersona"
        }

        let data = {
            email: "modifica@test.it",
            password: "modifica",
            nome: "modifica",
            cognome: "modifica",
            telefono: 1,
            dataNascita: "10/10/2000"
        }

        let modifica = {
            data
        }

        const registrazione = await request(app).post('/api/persona/register').send(personaTest)
        console.log(registrazione.body)

        const login = await request(app).post('/api/login').send(loginTest);
        console.log(login.body)

        let token = "errore";

        const response = await request(app).patch('/api/persona').set(`x-access-token`, token).send(modifica)
        
        expect(response.status).toBe(403);
        expect(response.body.message).toBe("Unauthorized access");

        let id = registrazione.body.persona._id
        await request(app).delete(`/api/persona/${id}`);
    })

    test('given a user "persona" with email attribute already present in the database, it should return status 400', async () => {

        let personaTest1 = {
            email: "testPersona1@test.it",
            password: "testPersona",
            nome: "test",
            cognome: "test",
            telefono: 1,
            dataNascita: "01/01/2000"
        }

        let personaTest2 = {
            email: "testPersona2@test.it",
            password: "testPersona",
            nome: "test",
            cognome: "test",
            telefono: 1,
            dataNascita: "01/01/2000"
        }

        let loginTest = {
            email: "testPersona1@test.it",
            password: "testPersona"
        }

        let data = {
            email: "testPersona2@test.it",
            password: "modifica",
            nome: "modifica",
            cognome: "modifica",
            telefono: 1,
            dataNascita: "10/10/2000"
        }

        let modifica = {
            data
        }

        const registrazione1 = await request(app).post('/api/persona/register').send(personaTest1)
        console.log(registrazione1.body)

        const registrazione2 = await request(app).post('/api/persona/register').send(personaTest2)
        console.log(registrazione2.body)

        const login = await request(app).post('/api/login').send(loginTest);
        console.log(login.body)

        let token = login.body.token;

        const response = await request(app).patch('/api/persona').set(`x-access-token`, token).send(modifica)
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("errore modifica dati");

        let id1 = registrazione1.body.persona._id
        await request(app).delete(`/api/persona/${id1}`);

        let id2 = registrazione2.body.persona._id
        await request(app).delete(`/api/persona/${id2}`);
    })
})    


describe('PATCH /api/attivita', () => {

    test('given a new email attribute and a correctly logged in user "attivita", it should change the email attribute and return status 200', async () => {
        
        let attivitaTest = {
            email: "testAttivita@test.it",
            password: "testAttivita",
            nomeAttivita: "test",
            indirizzo: "test",
            telefono: 1,
            partitaIVA: 1,
            iban: "1"
        }

        let loginTest = {
            email: "testAttivita@test.it",
            password: "testAttivita"
        }

        let data = {
            email: "modifica@test.it",
            password: "modifica",
            nomeAttivita: "modifica",
            telefono: 2,
            indirizzo: "modifica",
            partitaIVA: 2,
            iban: "2"
        }

        let modifica = {
            data
        }

        const registrazione = await request(app).post('/api/attivita/register').send(attivitaTest)
        console.log(registrazione.body)

        const login = await request(app).post('/api/login').send(loginTest)
        console.log(login.body)

        let token = login.body.token;

        const response = await request(app).patch('/api/attivita').set(`x-access-token`, token).send(modifica)
        console.log(response.body)

        expect(response.status).toBe(200);
        expect(response.body.auth).toBe(true);
        expect(response.body.message).toBe("dati modificati")

        let id = registrazione.body.attivita._id
        await request(app).delete(`/api/attivita/${id}`)
    })

    test('given a user "attivita" with non-existing token, it should return status 403', async () => {

        let attivitaTest = {
            email: "testAttivita@test.it",
            password: "testAttivita",
            nomeAttivita: "test",
            indirizzo: "test",
            telefono: 1,
            partitaIVA: 1,
            iban: "1"
        }

        let loginTest = {
            email: "testAttivita@test.it",
            password: "testAttivita"
        }

        let data = {
            email: "modifica@test.it",
            password: "modifica",
            nomeAttivita: "modifica",
            indirizzo: "modifica",
            telefono: 2,
            partitaIVA: 2,
            iban: "2"
        }

        let modifica = {
            data
        }

        const registrazione = await request(app).post('/api/attivita/register').send(attivitaTest)
        console.log(registrazione.body)

        const login = await request(app).post('/api/login').send(loginTest)
        console.log(login.body)

        const response = await request(app).patch('/api/attivita').send(modifica)
        
        expect(response.status).toBe(403);
        expect(response.body.errormessage).toBe("Token assente")

        // rimuovo l'evento creato in fase di testing 
        let id = registrazione.body.attivita._id
        await request(app).delete(`/api/attivita/${id}`)
    })

    test('given a user "attivita" with incorrect token, it should return status 403', async () => {

        let attivitaTest = {
            email: "testAttivita@test.it",
            password: "testAttivita",
            nomeAttivita: "test",
            indirizzo: "test",
            telefono: 1,
            partitaIVA: 1,
            iban: "1"
        }

        let loginTest = {
            email: "testAttivita@test.it",
            password: "testAttivita"
        }

        let data = {
            email: "modifica@test.it",
            password: "modifica",
            nomeAttivita: "modifica",
            indirizzo: "modifica",
            telefono: 2,
            partitaIVA: 2,
            iban: "2"
        }

        let modifica = {
            data
        }

        const registrazione = await request(app).post('/api/attivita/register').send(attivitaTest)
        console.log(registrazione.body)

        const login = await request(app).post('/api/login').send(loginTest);
        console.log(login.body)

        let token = "errore";

        const response = await request(app).patch('/api/attivita').set(`x-access-token`, token).send(modifica)
        
        expect(response.status).toBe(403);
        expect(response.body.message).toBe("Unauthorized access");

        let id = registrazione.body.attivita._id
        await request(app).delete(`/api/attivita/${id}`);
    })

    test('given a user "attivita" with email attribute already present in the database, it should return status 400', async () => {

        let attivitaTest1 = {
            email: "testAttivita1@test.it",
            password: "testAttivita",
            nomeAttivita: "test",
            indirizzo: "test",
            telefono: 1,
            partitaIVA: 1,
            iban: "1"
        }

        let attivitaTest2 = {
            email: "testAttivita2@test.it",
            password: "testAttivita",
            nomeAttivita: "test",
            indirizzo: "test",
            telefono: 1,
            partitaIVA: 1,
            iban: "1"
        }

        let loginTest = {
            email: "testAttivita1@test.it",
            password: "testAttivita"
        }

        let data = {
            email: "testAttivita2@test.it",
            password: "modifica",
            nomeAttivita: "modifica",
            indirizzo: "modifica",
            telefono: 2,
            partitaIVA: 2,
            iban: "2"
        }

        let modifica = {
            data
        }

        const registrazione1 = await request(app).post('/api/attivita/register').send(attivitaTest1)
        console.log(registrazione1.body)

        const registrazione2 = await request(app).post('/api/attivita/register').send(attivitaTest2)
        console.log(registrazione2.body)

        const login = await request(app).post('/api/login').send(loginTest);
        console.log(login.body)

        let token = login.body.token;

        const response = await request(app).patch('/api/attivita').set(`x-access-token`, token).send(modifica)
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("errore modifica dati");

        let id1 = registrazione1.body.attivita._id
        await request(app).delete(`/api/attivita/${id1}`);

        let id2 = registrazione2.body.attivita._id
        await request(app).delete(`/api/attivita/${id2}`);
    })
})  
