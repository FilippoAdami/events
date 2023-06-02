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
      throw new Error('Server Error');
    });

    const response = await request(app).get('/api/eventi/some-id');

    // Assert that the response status is 500 (Internal Server Error)
    expect(response.status).toBe(500);
    expect(response.text).toBe('Server error');
  });
});










// Test suite for the GET '/api/annunci/publisher/:publisher_id' path
describe('GET /api/eventi/publisher/:publisher_id', () => {
  test('should return all eventi published by a specific publisher', async () => {
    const publisherId = '647237535592096d9ae27a3a'; 
    const response = await request(app).get(`/api/eventi/publisher/${publisherId}`);
    expect(response.status).toBe(200);
    response.body.forEach(evento => {
      expect(evento.pubblicatore).toBe(publisherId);
    });
    expect(response.body).toEqual(expect.arrayContaining([])); 
  },20000);

  test('should return 403 if unauthorized access', async () => {
    const publisherId = '1';
    
    const response = await request(app).get(`/api/eventi/publisher/${publisherId}`);
    expect(response.status).toBe(403);
    expect(response.text).toBe('Unauthorized access');
  });

  test('should return 500 if an error occurs', async () => {
    // Mock the find method to throw an error
    jest.spyOn(Evento, 'find').mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    const publisherId = '647237535592096d9ae27a3a'; 
    const response = await request(app).get(`/api/eventi/publisher/${publisherId}`);
    expect(response.status).toBe(500);
    expect(response.error.text).toBe('Test error');
  });
});










// Test suite for the DELETE '/api/annunci/:id' path
describe('DELETE /api/eventi/:id', () => {
  test('should delete an evento given its id', async () => {
    
    // Create a sample evento
    let eventoTest = new Evento({
      titolo: "Test",
      data:"1995-12-17T03:24:00.000Z",
      ora:"2",
      indirizzo:"via del Test",
      descrizione:"Test descrizione",
      immagini:["Test Imagine 1"],
      costo:10,
      posti:10,
      postiLiberi:10,
      pubblicatore:"647237535592096d9ae27a3a",
      visibilita:true,
      categoria:"sport",
      segnalato:false,
      segnalazioni: [],
      utentiPrenotati: []
    })

    await eventoTest.save();

    const response = await request(app).delete(`/api/eventi/${eventoTest._id}`);
    expect(response.status).toBe(200);
    expect(response.text).toBe('Evento deleted successfully');
  });


  test('should return 403 if unauthorized access', async () => {
    
    // Create a sample evento
    let eventoTest = new Evento({
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
    })

    await eventoTest.save();

    const response = await request(app).delete(`/api/eventi/${eventoTest._id}`);
    expect(response.status).toBe(403);
    expect(response.text).toContain('Unauthorized access');
  });

  test('should return 404 if the annuncio deas not exist', async () => {
    const response = await request(app).delete(`/api/eventi/645cf5721dd165875a1417f0`);
    expect(response.status).toBe(404);
    expect(response.text).toContain('Evento non trovato');
  });

  test('should return 500 if an error occurs in the server', async () => {
    // Mock the deleteOne method to throw an error
    jest.spyOn(Annuncio.prototype, 'deleteOne').mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    const annuncioId = '6477a01052f366cbe3c5bcfa'; // Replace with the evento ID valid you want to delete
    const response = await request(app).delete(`/api/eventi/${annuncioId}`);
    
    expect(response.status).toBe(500);
    expect(response.text).toBe('errore al server in delete annuncio');
  });
});










// Test suite for the PATCH '/api/annunci/:id' path
describe('PATCH /eventi/:id', () => {
  test('should update an annuncio successfully', async () => {
    // Create a sample annuncio
    
    let eventoTest = new Evento({
      titolo: "Test",
      data:"1995-12-17T03:24:00.000Z",
      ora:"2",
      indirizzo:"via del Test",
      descrizione:"Test descrizione",
      immagini:["Test Imagine 1"],
      costo:10,
      posti:10,
      postiLiberi:10,
      pubblicatore:"647237535592096d9ae27a3a",
      visibilita:true,
      categoria:"sport",
      segnalato:false,
      segnalazioni: [],
      utentiPrenotati: []
    })
    await eventoTest.save();

    const response = await request(app).patch(`/api/eventi/${eventoTest._id}`).send({ titolo: 'Updated title'});

    await eventoTest.deleteOne(); // cancella l'evento di test

    expect(response.status).toBe(200);
    // Assert the response body
    expect(response.body).toEqual({
      __v: 0,
      _id: eventoTest._id.toString(),
      titolo: "Updated title",
      data: eventoTest.data.toISOString(),
      ora:"2",
      indirizzo:"via del Test",
      descrizione:"Test descrizione",
      immagini:["Test Imagine 1"],
      costo:10,
      posti:10,
      postiLiberi:10,
      pubblicatore:"647237535592096d9ae27a3a",
      visibilita:true,
      categoria:"sport",
      segnalato:false,
      segnalazioni: [],
      utentiPrenotati: []
    });
  });

  test('should return 403 if unauthorized access', async () => {
    // Create a sample evento
    
    let eventoTest = new Evento({
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
    })
    await eventoTest.save();

    const response = await request(app).patch(`/api/eventi/${eventoTest._id}`).send({ titolo: 'Updated title'});

    await eventoTest.deleteOne(); // cancella l'evento di test

    expect(response.status).toBe(403);
    expect(response.text).toContain('Unauthorized access');
  });

  test('should return 500 if an error occurs during the update', async () => {
    // Mock the save method to throw an error
    jest.spyOn(Evento.prototype, 'save').mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    const eventoId = '64779ee4c771b21370e401f8'; // Replace with the evento ID you want to update
    const response = await request(app).patch(`/api/eventi/${eventoId}`);
    
    expect(response.status).toBe(500);
    expect(response.text).toBe('Test error');
  });

  
});








// GEt posti Liberi
describe('GET/eventi/:id/postiLiberi', () => {

  test('should return the value of postiLiberi of the event specify by ID', async () =>{

    const eventoId = '64779ee4c771b21370e401f8'; // Replace with a valid evento ID 
    const evento = await request(app).get('/api/eventi/${eventoId}')
    const response = await request(app).get(`/api/eventi/${eventoId}/postiLiberi`);

    expect(response.status).toBe(200);
    expect(response.body.postiLiberi).toBe(evento.postiLiberi);
  })

  test('should return 500 if an error occurs during the search', async () => {
    // Mock the save method to throw an error
    jest.spyOn(Evento, 'findById').mockImplementationOnce(() => {
      throw new Error();
    });

    const eventoId = '64779ee4c771b21370e401f8'; // Replace with the evento ID you want to update
    const response = await request(app).get(`/api/eventi/${eventoId}/postiLiberi`);
    
    expect(response.status).toBe(500);
    expect(response.text).toBe('errore al server in getEvento');
  });

})











// GEt posti coordinate
describe('GET/eventi/:id/coordinate', () => {

  test('should return the value of indirizzo of the event specify by ID', async () =>{

    const eventoId = '64779ee4c771b21370e401f8'; // Replace with a valid evento ID 
    const evento = await request(app).get('/api/eventi/${eventoId}')
    const response = await request(app).get(`/api/eventi/${eventoId}/coordinate`);

    expect(response.status).toBe(200);
    expect(response.body.indirizzo).toBe(evento.indirizzo);
  })

  test('should return 500 if an error occurs during the search', async () => {
    // Mock the save method to throw an error
    jest.spyOn(Evento, 'findById').mockImplementationOnce(() => {
      throw new Error();
    });

    const eventoId = '64779ee4c771b21370e401f8'; // Replace with the evento ID you want to update
    const response = await request(app).get(`/api/eventi/${eventoId}/coordinate`);
    
    expect(response.status).toBe(500);
    expect(response.text).toBe('errore al server in getEvento');
  });

})









// GEt utentiPrenotati NON VA 
describe('GET/eventi/:id/utentiPrenotati', () => {

  test('should return the value of Persone that are registered to the event specify by ID', async () =>{

    let eventoTest = new Evento({
      titolo: "Test",
      data:"1995-12-17T03:24:00.000Z",
      ora:"2",
      indirizzo:"via del Test",
      descrizione:"Test descrizione",
      immagini:["Test Imagine 1"],
      costo:10,
      posti:10,
      postiLiberi:10,
      pubblicatore:"647237535592096d9ae27a3a",
      visibilita:true,
      categoria:"sport",
      segnalato:false,
      segnalazioni: [],
      utentiPrenotati: ['6471fccf2ff11c3b27c3e243','6470bed55bb7fe91de44b606']
    })
    await eventoTest.save();

    const response = await request(app).get(`/api/eventi/${eventoTest._id}/utentiPrenotati`);
    console.log('BODY')
    console.log(response.body)
   

    expect(response.status).toBe(200);
    
    await eventoTest.deleteOne();
  })

  
  test('should return 403 if unauthorized access', async () =>{

    let eventoTest = new Evento({
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
      utentiPrenotati: ['6471fccf2ff11c3b27c3e243','6470bed55bb7fe91de44b606']
    })
    await eventoTest.save();

    const response = await request(app).get(`/api/eventi/${eventoTest._id}/utentiPrenotati`);
   
    expect(response.status).toBe(403);
    expect(response.text).toContain('Unauthorized access');
    
    await eventoTest.deleteOne();
  })


  test('should return 404 if a person is not found', async () =>{

    let eventoTest = new Evento({
      titolo: "Test",
      data:"1995-12-17T03:24:00.000Z",
      ora:"2",
      indirizzo:"via del Test",
      descrizione:"Test descrizione",
      immagini:["Test Imagine 1"],
      costo:10,
      posti:10,
      postiLiberi:10,
      pubblicatore:"647237535592096d9ae27a3a",
      visibilita:true,
      categoria:"sport",
      segnalato:false,
      segnalazioni: [],
      utentiPrenotati: ['6471fccf2ff11c3b27c3e200','6470bed55bb7fe91de44b606']
    })
    await eventoTest.save();

    const response = await request(app).get(`/api/eventi/${eventoTest._id}/utentiPrenotati`);
   
    expect(response.status).toBe(404);
    expect(response.text).toContain('Persona not found');
    
    await eventoTest.deleteOne();
  })


  
  test('should return 500 if there is an error in the server', async () =>{

    jest.spyOn(Evento, 'findById').mockImplementationOnce(() => {
      throw new Error();
    });

    const eventoId = '6469d40788175e21c5bf230d'; 
    const response = await request(app).get(`/api/eventi/${eventoId}/utentiPrenotati`);
   
    expect(response.status).toBe(500);
    expect(response.text).toContain('errore al server in getEvento');
    
  })

})
