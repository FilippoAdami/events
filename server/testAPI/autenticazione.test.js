const request = require('supertest');
const app = require('../server');


//LOGIN
describe('POST /api/login', () => {

    //PERSONA
    test('given the correct email and password attributes of a "persona" user, should return status 200', async () => {

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

        const registrazione = await request(app).post('/api/persona/register').send(personaTest)
        console.log(registrazione.body)

        const response = await request(app).post('/api/login').send(loginTest)
        console.log(response.body)

        expect(response.status).toBe(200);
        expect(response.body.auth).toBe(true);
        expect(response.body.message).toBe("login effettuato")

        let id = registrazione.body.persona._id
        await request(app).delete(`/api/persona/${id}`)
    })

    test('given the correct mail attribute and wrong password of a user "persona", should return status 400', async () => {

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
            password: "passwordSbagliata"
        }

        const registrazione = await request(app).post('/api/persona/register').send(personaTest)
        console.log(registrazione.body)

        const response = await request(app).post('/api/login').send(loginTest)
        console.log(response.body)

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("password sbagliata")

        let id = registrazione.body.persona._id
        await request(app).delete(`/api/persona/${id}`)
    })

    //ATTIVITA
    test('given the correct email and password attributes of a "attivita" user, it should return status 200', async () => {

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

        const registrazione = await request(app).post('/api/attivita/register').send(attivitaTest)
        console.log(registrazione.body)

        const response = await request(app).post('/api/login').send(loginTest)
        console.log(response.body)

        expect(response.status).toBe(200);
        expect(response.body.auth).toBe(true);
        expect(response.body.message).toBe("login effettuato")

        let id = registrazione.body.attivita._id
        await request(app).delete(`/api/attivita/${id}`)
    })

    test('given the correct mail attribute and wrong password of a user "attivita", it should return status 400', async () => {

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
            password: "passwordSbagliata"
        }

        const registrazione = await request(app).post('/api/attivita/register').send(attivitaTest)
        console.log(registrazione.body)

        const response = await request(app).post('/api/login').send(loginTest)
        console.log(response.body)

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("password sbagliata")

        let id = registrazione.body.attivita._id
        await request(app).delete(`/api/attivita/${id}`)
    })

    //UTENTE INESISTENTE
    test('given a mail attribute that does not exist in the database, it should return status 400', async () =>{
        
        let loginTest = {
            email: "mail@inesistente.it",
            password: "testPersona"
        }

        const response = await request(app).post('/api/login').send(loginTest)
        console.log(response.body)

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("utente non trovato")
    })
})


//LOGOUT
describe('GET /api/logout', () => {

    //PERSONA
    test('given a correctly logged in "persona" user, it should return status 200', async () => {

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

        const registrazione = await request(app).post('/api/persona/register').send(personaTest)
        console.log(registrazione.body)

        const login = await request(app).post('/api/login').send(loginTest);
        console.log(login.body)

        let token = login.body.token;

        const response = await request(app).get('/api/logout').set(`x-access-token`, token)
        
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("logout effettuato");

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

        const registrazione = await request(app).post('/api/persona/register').send(personaTest)
        console.log(registrazione.body)

        const login = await request(app).post('/api/login').send(loginTest)
        console.log(login.body)

        const response = await request(app).get('/api/logout')
        
        expect(response.status).toBe(403);
        expect(response.body.errormessage).toBe("Token assente")

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

        const registrazione = await request(app).post('/api/persona/register').send(personaTest)
        console.log(registrazione.body)

        const login = await request(app).post('/api/login').send(loginTest);
        console.log(login.body)

        let token = "errore";

        const response = await request(app).get('/api/logout').set(`x-access-token`, token)
        
        // Assert that the response status is 201 (Created)
        expect(response.status).toBe(403);
        expect(response.body.message).toBe("Unauthorized access");

        // rimuovo l'evento creato in fase di testing 
        let id = registrazione.body.persona._id
        await request(app).delete(`/api/persona/${id}`);
    })


    //ATTIVITA
    test('given a correctly logged in "attivita" user, it should return status 200', async () => {

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

        const registrazione = await request(app).post('/api/attivita/register').send(attivitaTest)
        console.log(registrazione.body)

        const login = await request(app).post('/api/login').send(loginTest);
        console.log(login.body)

        let token = login.body.token;

        const response = await request(app).get('/api/logout').set(`x-access-token`, token);
        
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("logout effettuato")

        // rimuovo l'evento creato in fase di testing 
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

        const registrazione = await request(app).post('/api/attivita/register').send(attivitaTest)
        console.log(registrazione.body)

        const login = await request(app).post('/api/login').send(loginTest)
        console.log(login.body)

        const response = await request(app).get('/api/logout')
        
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

        const registrazione = await request(app).post('/api/attivita/register').send(attivitaTest)
        console.log(registrazione.body)

        const login = await request(app).post('/api/login').send(loginTest)
        console.log(login.body)

        let token = "errore";

        const response = await request(app).get('/api/logout').set(`x-access-token`, token)
        
        // Assert that the response status is 201 (Created)
        expect(response.status).toBe(403);
        expect(response.body.message).toBe("Unauthorized access")

        // rimuovo l'evento creato in fase di testing 
        let id = registrazione.body.attivita._id
        await request(app).delete(`/api/attivita/${id}`)
    })
})


//ELIMINA ACCOUNT
describe('DELETE /api/elimina', () => {

    //PERSONA
    test('given a correctly logged in "persona" user, it should delete the user from the database and return status 200', async () => {

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

        const registrazione = await request(app).post('/api/persona/register').send(personaTest)
        console.log(registrazione.body)

        const login = await request(app).post('/api/login').send(loginTest)
        console.log(login.body)

        let token = login.body.token;

        const response = await request(app).delete('/api/elimina').set(`x-access-token`, token)
        console.log(response.body)
        
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("utente eliminato")
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

        const registrazione = await request(app).post('/api/persona/register').send(personaTest)
        console.log(registrazione.body)

        const login = await request(app).post('/api/login').send(loginTest)
        console.log(login.body)

        const response = await request(app).delete('/api/elimina')
        
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

        const registrazione = await request(app).post('/api/persona/register').send(personaTest)
        console.log(registrazione.body)

        const login = await request(app).post('/api/login').send(loginTest)
        console.log(login.body)

        let token = "errore";

        const response = await request(app).delete('/api/elimina').set(`x-access-token`, token)
        
        // Assert that the response status is 201 (Created)
        expect(response.status).toBe(403);
        expect(response.body.message).toBe("Unauthorized access")

        // rimuovo l'evento creato in fase di testing 
        let id = registrazione.body.persona._id
        await request(app).delete(`/api/persona/${id}`)
    })


    //ATTIVITA
    test('given a correctly logged in "attivita" user, it should delete the user from the database and return status 200', async () => {

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

        const registrazione = await request(app).post('/api/attivita/register').send(attivitaTest)
        console.log(registrazione.body)

        const login = await request(app).post('/api/login').send(loginTest)
        console.log(login.body)

        let token = login.body.token;

        const response = await request(app).delete('/api/elimina').set(`x-access-token`, token)
        console.log(response.body)
        
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("utente eliminato")
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

        const registrazione = await request(app).post('/api/attivita/register').send(attivitaTest)
        console.log(registrazione.body)

        const login = await request(app).post('/api/login').send(loginTest)
        console.log(login.body)

        const response = await request(app).delete('/api/elimina')
        
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

        const registrazione = await request(app).post('/api/attivita/register').send(attivitaTest)
        console.log(registrazione.body)

        const login = await request(app).post('/api/login').send(loginTest)
        console.log(login.body)

        let token = "errore";

        const response = await request(app).delete('/api/elimina').set(`x-access-token`, token)
        
        // Assert that the response status is 201 (Created)
        expect(response.status).toBe(403);
        expect(response.body.message).toBe("Unauthorized access")

        // rimuovo l'evento creato in fase di testing 
        let id = registrazione.body.attivita._id
        await request(app).delete(`/api/attivita/${id}`)
    })
})
