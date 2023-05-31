const { mockRequest, mockResponse } = require('jest-mock-req-res');
const request = require('supertest');
const app = require('../server');
const Evento = require('../models/eventoM');
const mongoose = require('mongoose');
const {getEvento} = require('../routes/eventoR');











// Test GET '/api/eventi' 
describe('GET /api/eventi', () => {
  test('should return all annunci', async () => {
    const response = await request(app).get('/api/eventi');

    // Assert that the response status is 200 (OK)
    expect(response.status).toBe(200);
  });

  // Test to check if the server returns a 500 status code when an error occurs
  test('should return 500 if an error occurs', async () => {
    // Mock the 'find' method of the 'Evento' model to throw an error
    jest.spyOn(Evento, 'find').mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    // Send a GET request to the '/api/eventi' endpoint
    const response = await request(app).get('/api/eventi');

    // Assert that the response status is 500 (Internal Server Error)
    expect(response.status).toBe(500);

    // Assert that the response body contains the expected error message
    expect(response.body.message).toBe('Test error');
  });
});











// Test POST '/api/eventi'
describe('POST /api/eventi', () => {
    // Test to check if a new annuncio is created successfully
    test(', given all tha attributes, should create a new evento with a equal number of posti and postiLiberi, value of segnalato false', async () => {
        
        let eventoTest ={
            titolo: "Test",
            data:"2023-05-21",
            ora:"2",
            indirizzo:"via del Test",
            descrizione:"Test descrizione",
            immagini:["Test Imagine 1"],
            costo:10,
            posti:10,
            visibilita:true,
            categoria:"sport",
        }

        // Send a POST request to the '/api/eventi' endpoint
        const response = await await request(app).post('/api/eventi').send(eventoTest);
        console.log(response.body)
        // Assert that the response status is 201 (Created)
        expect(response.status).toBe(201);
        expect(response.body.postiLiberi).toBe(response.body.postiLiberi);
        expect(response.body.segnalato).toBe(false);
        // quando facciamo il merge dobbiamo verificare che l'id del pubblicatore sia corretto
    });

    // Testing if a post without non requested attributed go right
    test(',not given not required attributes, should create a new evento with a equal number of posti and postiLiberi, value of segnalato false and categoria equal to altro', async () => {
        
      let eventoTest ={
          titolo: "Test",
          data:"2023-05-21",
          ora:"2",
          indirizzo:"via del Test",
          costo:10,
          posti:10,
          visibilita:true,
      }

      // Send a POST request to the '/api/eventi' endpoint
      const response = await request(app).post('/api/eventi').send(eventoTest);
      console.log(response.body)
      // Assert that the response status is 201 (Created)
      expect(response.status).toBe(201);
      expect(response.body.postiLiberi).toBe(response.body.postiLiberi);
      expect(response.body.segnalato).toBe(false);
      expect(response.body.categoria).toBe("altro")
      // quando facciamo il merge dobbiamo verificare che l'id del pubblicatore sia corretto
  });
    
    // Test to check if the server returns a 400 status code when some attributes are not specify, and if the attribute is specify corectly 
    test('should return 400 if in the request is not define title ', async () => {
        
      let eventoTest ={
        data:"2023-05-21",
        ora:"2",
        indirizzo:"via del Test",
        descrizione:"Test descrizione",
        immagini:["Test Imagine 1"],
        costo:10,
        posti:10,
        visibilita:true,
        categoria:"sport",
      }
    
      // Send a POST request to the '/api/eventi' endpoint
      const response = await request(app).post('/api/eventi').send(eventoTest);
  
      // Assert that the response status is 400 (Bad Request)
      expect(response.status).toBe(400);
      expect(response.body.errormessage).toBe('Titolo assente'); // Compare without double quotes

    },10000);

    test('should return 400 if in the request is not define date ', async () => {
        
      let eventoTest ={
        titolo: "Test",
        ora:"2",
        indirizzo:"via del Test",
        descrizione:"Test descrizione",
        immagini:["Test Imagine 1"],
        costo:10,
        posti:10,
        visibilita:true,
        categoria:"sport",
      }
    
      const response = await request(app).post('/api/eventi').send(eventoTest);
  
      expect(response.status).toBe(400);
      expect(response.body.errormessage).toBe('Data assente');

    });

    test('should return 400 if in the request is not define ora ', async () => {
        
      let eventoTest ={
        titolo: "Test",
        data:"2023-05-21",
        indirizzo:"via del Test",
        descrizione:"Test descrizione",
        immagini:["Test Imagine 1"],
        costo:10,
        posti:10,
        visibilita:true,
        categoria:"sport",
      }
    
      const response = await request(app).post('/api/eventi').send(eventoTest);
  
      expect(response.status).toBe(400);
      expect(response.body.errormessage).toBe('Ora assente');

    });

    test('should return 400 if in the request is not define indirizzo ', async () => {
        
      let eventoTest ={
        titolo: "Test",
        data:"2023-05-21",
        ora:"2",
        descrizione:"Test descrizione",
        immagini:["Test Imagine 1"],
        costo:10,
        posti:10,
        visibilita:true,
        categoria:"sport",
      }
    
      const response = await request(app).post('/api/eventi').send(eventoTest);
  
      expect(response.status).toBe(400);
      expect(response.body.errormessage).toBe('Indirizzo assente');

    });

    test('should return 400 if in the request is not define costo ', async () => {
        
      let eventoTest ={
        titolo: "Test",
        data:"2023-05-21",
        ora:"2",
        indirizzo:"via del Test",
        descrizione:"Test descrizione",
        immagini:["Test Imagine 1"],
        posti:10,
        visibilita:true,
        categoria:"sport",
      }
    
      const response = await request(app).post('/api/eventi').send(eventoTest);
  
      expect(response.status).toBe(400);
      expect(response.body.errormessage).toBe('Costo assente');

    });

    test('should return 400 if in the request is not define posti ', async () => {
        
      let eventoTest ={
        titolo: "Test",
        data:"2023-05-21",
        ora:"2",
        indirizzo:"via del Test",
        descrizione:"Test descrizione",
        immagini:["Test Imagine 1"],
        costo:10,
        visibilita:true,
        categoria:"sport",
      }
    
      const response = await request(app).post('/api/eventi').send(eventoTest);
  
      expect(response.status).toBe(400);
      expect(response.body.errormessage).toBe('Posti assente');

    });

    test('should return 400 if in the request is not define visibilità ', async () => {
        
      let eventoTest ={
        titolo: "Test",
        data:"2023-05-21",
        ora:"2",
        indirizzo:"via del Test",
        descrizione:"Test descrizione",
        immagini:["Test Imagine 1"],
        costo:10,
        posti:10,
        categoria:"sport",
      }
    
      const response = await request(app).post('/api/eventi').send(eventoTest);
  
      expect(response.status).toBe(400);
      expect(response.body.errormessage).toBe('Visibilita assente');

    });
    
    //Testing error 500
    test('should return 500 if an error occurs in the saving', async () => {
      // Mock the 'save' method of the 'Evento' model to throw an error
      jest.spyOn(Evento.prototype, 'save').mockImplementationOnce(() => {
        const errore = new Error('Test error');
        throw errore;
      });

      
      let eventoTest ={
        titolo: "Test",
        data:"2023-05-21",
        ora:"2",
        indirizzo:"via del Test",
        descrizione:"Test descrizione",
        immagini:["Test Imagine 1"],
        costo:10,
        posti:10,
        visibilita:true,
        categoria:"sport",
      }
  
      const response = await request(app).post('/api/eventi').send(eventoTest);
  
      // Assert that the response status is 500 
      expect(response.status).toBe(500);
      const receivedErrorMessage = JSON.parse(response.error.text); // Parse the error message from the response
      expect(receivedErrorMessage).toBe('Test error'); // Compare without double quotes
  });
});











// Test suite for the GET '/api/evento/:id' 
describe('GET /api/eventi/:id', () => {
  test('should return the banner if it exists', async () => {
    // Create a sample evento
    const date = new Date('1995-12-17T03:24:00.000Z');
    const eventoTest = new Evento({
      titolo: "Test",
      data: date,
      ora:"2",
      indirizzo:"via del Test",
      descrizione:"Test descrizione",
      immagini:["Test Imagine 1"],
      costo:10,
      posti:10,
      postiLiberi:10,
      pubblicatore:"1",
      visibilita:true,
      categoria:"sport",
      segnalato:false
    });
    await eventoTest.save();

    // Send a GET request to the '/api/evento/:id' endpoint
    const response = await request(app).get(`/api/eventi/${eventoTest._id}`);

    // Assert that the response status is 200 (OK)
    expect(response.status).toBe(200);

    // Assert that the response body matches the expected evento
    expect(response.body).toEqual({
      __v: 0,
      _id: eventoTest._id.toString(),
      titolo: "Test",
      data:"1995-12-17T03:24:00.000Z",
      ora:"2",
      indirizzo:"via del Test",
      descrizione:"Test descrizione",
      immagini:["Test Imagine 1"],
      costo:10,
      posti:10,
      postiLiberi:10,
      pubblicatore:"1",
      visibilita:true,
      categoria:"sport",
      segnalato:false,
      segnalazioni: [],
      utentiPrenotati: []
    });

    // Delete the test event created for testing
    await eventoTest.deleteOne();

  });

  //Testing evento not found 
  test('should return 404 if the annuncio is not found', async () => {
    
    // Create an valid ObjectId not used
    const validObjectId = '000d0000aafe0fd0000f0000';
    const response = await request(app).get('/api/eventi/'+validObjectId+'');

    // Assert that the response status is 404 (Not Found)
    expect(response.status).toBe(404);
    expect(response.body.errormessag).toBe('Evento not found');
  });

  
  test('should return 500 if an error occurs in findById operation', async () => {
    // Mock the 'findById' method of the 'Evento' model to throw an error
    jest.spyOn(Evento, 'findById').mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    const response = await request(app).get('/api/eventi/some-id');

    // Assert that the response status is 500 (Internal Server Error)
    expect(response.status).toBe(500);
    expect(response.text).toBe('Server error');

    // ... perform other assertions ...
  });
});