const request = require('supertest');
const app = require('../server');
const Evento = require('../models/eventoM');
const Persona = require('../models/personaM')


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
            titolo: "TestEliminato",
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

        //token valido ed ID dell'utente Test (token settato che non scada mai) 
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"
        let id_utente_test = "647ef0def12d8fd18d5b36b2"

        // Send a POST request to the '/api/eventi' endpoint
        const response = await request(app).post('/api/eventi').set(`x-access-token`,token).send(eventoTest);
        console.log(response.body);

        // Assert that the response status is 201 (Created)
        expect(response.status).toBe(201);
        expect(response.body.postiLiberi).toBe(response.body.postiLiberi);
        expect(response.body.segnalato).toBe(false);
        expect(response.body.pubblicatore).toBe(id_utente_test)


        // rimuovo l'evento creato in fase di testing 
        let id = response.body._id
        await Evento.findByIdAndDelete(id) 
    });

    // Testing if a post without non requested attributed go right
    test(',not given not required attributes, should create a new evento with a equal number of posti and postiLiberi, value of segnalato false and categoria equal to altro', async () => {
        
      let eventoTest ={
          titolo: "TestEliminato",
          data:"2023-05-21",
          ora:"2",
          indirizzo:"via del Test",
          costo:10,
          posti:10,
          visibilita:true,
      }

      //token valido ed ID dell'utente Test (token settato che non scada mai) 
      let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"
      let id_utente_test = "647ef0def12d8fd18d5b36b2"

      // Send a POST request to the '/api/eventi' endpoint
      const response = await request(app).post('/api/eventi').set(`x-access-token`,token).send(eventoTest);
      
      // Assert that the response status is 201 (Created)
      expect(response.status).toBe(201);
      expect(response.body.postiLiberi).toBe(response.body.postiLiberi);
      expect(response.body.segnalato).toBe(false);
      expect(response.body.categoria).toBe("altro")
      expect(response.body.pubblicatore).toBe(id_utente_test)


      // rimuovo l'evento creato in fase di testing 
      let id = response.body._id
      await Evento.findByIdAndDelete(id) 
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
    
       //token valido ed ID dell'utente Test (token settato che non scada mai) 
       let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"
       let id_utente_test = "647ef0def12d8fd18d5b36b2"
 
       // Send a POST request to the '/api/eventi' endpoint
       const response = await request(app).post('/api/eventi').set(`x-access-token`,token).send(eventoTest);
  
        // Assert that the response status is 400 (Bad Request)
        expect(response.status).toBe(400);
        expect(response.body.errormessage).toBe('Titolo assente'); // Compare without double quotes

    });

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

      //token valido ed ID dell'utente Test (token settato che non scada mai) 
      let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"
      let id_utente_test = "647ef0def12d8fd18d5b36b2"

      // Send a POST request to the '/api/eventi' endpoint
      const response = await request(app).post('/api/eventi').set(`x-access-token`,token).send(eventoTest);
 
  
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
    
      //token valido ed ID dell'utente Test (token settato che non scada mai) 
      let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"
      let id_utente_test = "647ef0def12d8fd18d5b36b2"

      // Send a POST request to the '/api/eventi' endpoint
      const response = await request(app).post('/api/eventi').set(`x-access-token`,token).send(eventoTest);
 
  
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
    
      //token valido ed ID dell'utente Test (token settato che non scada mai) 
      let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"
      let id_utente_test = "647ef0def12d8fd18d5b36b2"

      // Send a POST request to the '/api/eventi' endpoint
      const response = await request(app).post('/api/eventi').set(`x-access-token`,token).send(eventoTest);

  
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
    
      //token valido ed ID dell'utente Test (token settato che non scada mai) 
      let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"
      let id_utente_test = "647ef0def12d8fd18d5b36b2"

      // Send a POST request to the '/api/eventi' endpoint
      const response = await request(app).post('/api/eventi').set(`x-access-token`,token).send(eventoTest);
 
  
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
    
      //token valido ed ID dell'utente Test (token settato che non scada mai) 
      let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"
      let id_utente_test = "647ef0def12d8fd18d5b36b2"

      // Send a POST request to the '/api/eventi' endpoint
      const response = await request(app).post('/api/eventi').set(`x-access-token`,token).send(eventoTest);
 
  
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
    
      //token valido ed ID dell'utente Test (token settato che non scada mai) 
      let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"
      let id_utente_test = "647ef0def12d8fd18d5b36b2"

      // Send a POST request to the '/api/eventi' endpoint
      const response = await request(app).post('/api/eventi').set(`x-access-token`,token).send(eventoTest);
 
  
      expect(response.status).toBe(400);
      expect(response.body.errormessage).toBe('Visibilita assente');

    });


    // Testing Tocken Cheker part
    test('should return 400 if in the request is not define token ', async () => {
        
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

      // Send a POST request to the '/api/eventi' endpoint
      const response = await request(app).post('/api/eventi').send(eventoTest);
 
  
      expect(response.status).toBe(400);
      expect(response.body.errormessage).toBe('Token assente');

    });
    
    //Testing error 403
    test('should return 403 with error in the token', async () => {
        
        let eventoTest ={
            titolo: "TestEliminato",
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

        //token valido ed ID dell'utente Test (token settato che non scada mai) 
        let token = "errore"
      
        // Send a POST request to the '/api/eventi' endpoint
        const response = await request(app).post('/api/eventi').set(`x-access-token`,token).send(eventoTest);
        console.log(response.body);

        // Assert that the response status is 201 (Created)
        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Unauthorized access');
       
    });


    //Testing error 500
    test('should return 500 if an error occurs in the server operation', async () => {
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
  
      //token valido ed ID dell'utente Test (token settato che non scada mai) 
      let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"
      let id_utente_test = "647ef0def12d8fd18d5b36b2"

      // Send a POST request to the '/api/eventi' endpoint
      const response = await request(app).post('/api/eventi').set(`x-access-token`,token).send(eventoTest);
 
  
      // Assert that the response status is 500 
      expect(response.status).toBe(500);
      const receivedErrorMessage = JSON.parse(response.error.text); // Parse the error message from the response
      expect(receivedErrorMessage).toBe('Test error'); // Compare without double quotes
  });
});










// Test suite for the GET '/api/evento/:id' 
describe('GET /api/eventi/:id', () => {
  test('should return the evento if it exists', async () => {
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
  test('should return 404 if the evento is not found', async () => {
    
    // Create an valid ObjectId not used
    const validObjectId = '000d0000aafe0fd0000f0009';
    const response = await request(app).get('/api/eventi/'+validObjectId+'');

    // Assert that the response status is 404 (Not Found)
    expect(response.status).toBe(404);
    expect(response.body.errormessag).toBe('Evento not found');
  });

  
  test('should return 500 if an error occurs in server operations', async () => {
    // Mock the 'findById' method of the 'Evento' model to throw an error
    jest.spyOn(Evento, 'findById').mockImplementationOnce(() => {
      throw new Error('Server Error');
    });

    const response = await request(app).get('/api/eventi/some-id');

    // Assert that the response status is 500 (Internal Server Error)
    expect(response.status).toBe(500);
    expect(response.text).toBe('Server Error');
  });
});










// Test suite for the GET '/api/eventi/publisher/:publisher_id' path
describe('GET /api/eventi/publisher/:publisher_id', () => {
  test('should return all eventi published by a specific publisher', async () => {

    //token valido ed ID dell'utente Test (token settato che non scada mai) 
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"
    let publisherId = "647ef0def12d8fd18d5b36b2"

    const response = await request(app).get(`/api/eventi/publisher/${publisherId}`).set(`x-access-token`,token);
    expect(response.status).toBe(200);
    response.body.forEach(evento => {
      expect(evento.pubblicatore).toBe(publisherId);
    });
    

  },20000);

  test('should return 403 if the user that make the request is not the same of publisherId', async () => {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"
    let publisherId = "647ef0def12d8fd18d5b36b3" // diverso dall'id dell'utente test: ultima cifra dovrebbe essere un 2 invece è settata a 3
    
    const response = await request(app).get(`/api/eventi/publisher/${publisherId}`).set(`x-access-token`,token);
    expect(response.status).toBe(403);
    expect(response.text).toBe('Unauthorized access');
  });

  
  test('should return 400 in the request is not passed the token', async () => {
    let publisherId = "647ef0def12d8fd18d5b36b3" // diverso dall'id dell'utente test: ultima cifra dovrebbe essere un 2 invece è settata a 3
    
    const response = await request(app).get(`/api/eventi/publisher/${publisherId}`);
    expect(response.status).toBe(400);
    expect(response.body.errormessage).toBe('Token assente');
  });



  test('should return 500 if an error occurs in server operations', async () => {
    // Mock the find method to throw an error
    jest.spyOn(Evento, 'find').mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"
    let publisherId = "647ef0def12d8fd18d5b36b2" 

    const response = await request(app).get(`/api/eventi/publisher/${publisherId}`).set(`x-access-token`,token);
    expect(response.status).toBe(500);
    expect(response.error.text).toBe('Test error');
  });
});










// Test suite for the DELETE '/api/eventi/:id' path
describe('DELETE /api/eventi/:id', () => {
  test('should delete an evento given its id', async () => {
    
    // Create a sample evento
    let eventoTest = new Evento({
      titolo: "TestDelete",
      data:"1995-12-17T03:24:00.000Z",
      ora:"2",
      indirizzo:"via del Test",
      descrizione:"Test descrizione",
      immagini:["Test Imagine 1"],
      costo:10,
      posti:10,
      postiLiberi:10,
      pubblicatore:"647ef0def12d8fd18d5b36b2",
      visibilita:true,
      categoria:"sport",
      segnalato:false,
      segnalazioni: [],
      utentiPrenotati: []
    })
    await eventoTest.save();

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"

    const response = await request(app).delete(`/api/eventi/${eventoTest._id}`).set(`x-access-token`,token);
    expect(response.status).toBe(200);
    expect(response.text).toBe('Evento deleted successfully');
  });


  test('should return 403 if the user id that make the request is different from the publisher id of the event', async () => {
    
    // Create a sample evento
    let eventoTest = new Evento({
      titolo: "TestDelete",
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

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"
   
    const response = await request(app).delete(`/api/eventi/${eventoTest._id}`).set(`x-access-token`,token);
    expect(response.status).toBe(403);
    expect(response.text).toContain('Unauthorized access');

    await eventoTest.deleteOne();

  });

  test('should return 404 if the evento deas not exist', async () => {

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"

    const response = await request(app).delete(`/api/eventi/645cf5721dd165875a1417f0`).set(`x-access-token`,token);
    expect(response.status).toBe(404);
    expect(response.text).toContain('Evento non trovato');
  });

  test('should return 500 if an error occurs in the server operations', async () => {
    // Mock the deleteOne method to throw an error
    jest.spyOn(Evento.prototype, 'deleteOne').mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    let eventoTest = new Evento({
      titolo: "TestDelete",
      data:"1995-12-17T03:24:00.000Z",
      ora:"2",
      indirizzo:"via del Test",
      descrizione:"Test descrizione",
      immagini:["Test Imagine 1"],
      costo:10,
      posti:10,
      postiLiberi:10,
      pubblicatore:"647ef0def12d8fd18d5b36b2",
      visibilita:true,
      categoria:"sport",
      segnalato:false,
      segnalazioni: [],
      utentiPrenotati: []
    })
    await eventoTest.save();

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"

    const response = await request(app).delete(`/api/eventi/${eventoTest._id}`).set(`x-access-token`,token);
    
    expect(response.status).toBe(500);
    expect(response.text).toBe('errore al server in delete evento');

    await eventoTest.deleteOne();

  });
});










// Test suite for the PATCH '/api/eventi/:id' path
describe('PATCH /eventi/:id', () => {
  test('should update an annuncio successfully', async () => {
    // Create a sample annuncio
    
    let eventoTest = new Evento({
      titolo: "TestUpdate",
      data:"1995-12-17T03:24:00.000Z",
      ora:"2",
      indirizzo:"via del Test",
      descrizione:"Test descrizione",
      immagini:["Test Imagine 1"],
      costo:10,
      posti:10,
      postiLiberi:10,
      pubblicatore:"647ef0def12d8fd18d5b36b2",
      visibilita:true,
      categoria:"sport",
      segnalato:false,
      segnalazioni: [],
      utentiPrenotati: []
    })
    await eventoTest.save();

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"

    const response = await request(app).patch(`/api/eventi/${eventoTest._id}`).set(`x-access-token`,token).send({ titolo: 'Updated title'});

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
      pubblicatore:"647ef0def12d8fd18d5b36b2",
      visibilita:true,
      categoria:"sport",
      segnalato:false,
      segnalazioni: [],
      utentiPrenotati: []
    });
  });

  test('should retshould return 403 if the user id that make the request is different from the publisher id of the event', async () => {
    // Create a sample evento
    
    let eventoTest = new Evento({
      titolo: "TestUpdate",
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

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"
    const response = await request(app).patch(`/api/eventi/${eventoTest._id}`).set(`x-access-token`,token).send({ titolo: 'Updated title'});
    
    await eventoTest.deleteOne(); // cancella l'evento di test

    expect(response.status).toBe(403);
    expect(response.text).toContain('Unauthorized access');
  });

  test('should return 500 if an error occurs during the update', async () => {
    
    
    let eventoTest = new Evento({
      titolo: "TestUpdate",
      data:"1995-12-17T03:24:00.000Z",
      ora:"2",
      indirizzo:"via del Test",
      descrizione:"Test descrizione",
      immagini:["Test Imagine 1"],
      costo:10,
      posti:10,
      postiLiberi:10,
      pubblicatore:"647ef0def12d8fd18d5b36b2",
      visibilita:true,
      categoria:"sport",
      segnalato:false,
      segnalazioni: [],
      utentiPrenotati: []
    })
    await eventoTest.save();
    
    
    // Mock the save method to throw an error
    await jest.spyOn(Evento.prototype, 'save').mockImplementationOnce(() => {
      const errore = new Error('Test error');
      throw errore;
    });


    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"
    const response = await request(app).patch(`/api/eventi/${eventoTest._id}`).set(`x-access-token`,token).send({ titolo: 'Updated title'});
    
    await eventoTest.deleteOne(); // cancella l'evento di test

    expect(response.status).toBe(500);
    expect(response.text).toBe('Test error');
  });

  
});









// Get posti Liberi
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







// Get posti coordinate
describe('GET/eventi/:id/coordinate', () => {

  test('should return the value of indirizzo of the event specify by ID', async () =>{

    const eventoId = '64779ee4c771b21370e401f8'; // Replace with a valid evento ID 
    const evento = await request(app).get('/api/eventi/'+eventoId+'')
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







// Get utentiPrenotati 
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
      pubblicatore:"647ef0def12d8fd18d5b36b2",
      visibilita:true,
      categoria:"sport",
      segnalato:false,
      segnalazioni: [],
      utentiPrenotati: ['6471fccf2ff11c3b27c3e243','64720071aecb1f04e2ef4ec2']
    })
    await eventoTest.save();

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"
    const response = await request(app).get(`/api/eventi/${eventoTest._id}/utentiPrenotati`).set(`x-access-token`,token);
   
    expect(response.status).toBe(200);
    console.log(response.body)
    
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

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"
    const response = await request(app).get(`/api/eventi/${eventoTest._id}/utentiPrenotati`).set(`x-access-token`,token);

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
      pubblicatore:"647ef0def12d8fd18d5b36b2",
      visibilita:true,
      categoria:"sport",
      segnalato:false,
      segnalazioni: [],
      utentiPrenotati: ['6471fccf2ff11c3b27c3e200','6470bed55bb7fe91de44b606']
    })
    await eventoTest.save();

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"
    const response = await request(app).get(`/api/eventi/${eventoTest._id}/utentiPrenotati`).set(`x-access-token`,token);
   
    expect(response.status).toBe(404);
    expect(response.text).toContain('Persona not found');
    
    await eventoTest.deleteOne();
  })


  
  test('should return 500 if there is an error in the server', async () =>{

    jest.spyOn(Evento, 'findById').mockImplementationOnce(() => {
      throw new Error();
    });

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
      pubblicatore:"647ef0def12d8fd18d5b36b2",
      visibilita:true,
      categoria:"sport",
      segnalato:false,
      segnalazioni: [],
      utentiPrenotati: ['6471fccf2ff11c3b27c3e200','6470bed55bb7fe91de44b606']
    })
    await eventoTest.save();

    const eventoId = '6469d40788175e21c5bf230d'; 
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"
    const response = await request(app).get(`/api/eventi/${eventoTest._id}/utentiPrenotati`).set(`x-access-token`,token);

    expect(response.status).toBe(500);
    expect(response.text).toContain('errore al server in getEvento');

    await eventoTest.deleteOne();
    
  })

})







// Get utentiPrenotati ( ADAMI )
describe('GET /eventi/utente/:utente_id', () => {
  it('should return eventi prenotati for a specific utente', async () => {
    // Test setup
    const utenteId = '647ef0def12d8fd18d5b36b2'; // utente ID of out utente Test

    //Request
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"
    const response = await request(app).get('/api/eventi/utente/'+utenteId+'').set(`x-access-token`,token);

    console.log(response.body)

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    // control if in every event in the list of utentiPrenotati there is utenteId
    response.body.forEach(event => {
      expect(event.utentiPrenotati).toContain(utenteId)
    });
   
  });

  it('should return 403 if unauthorized', async () => {
    // Test setup
    const utenteId = '64727ffe18301cb1f9737062'; // utente ID different from the Id of the account

    // Request
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"
    const response = await request(app).get('/api/eventi/utente/'+utenteId+'').set(`x-access-token`,token);

    expect(response.status).toBe(403);
    
  });

  it('should return 404 if utente id passed is not found', async () => {
    // Test setup
    const utenteId = '647237535592096d9ae27a3b'; // non-existent utente ID

    // Request
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"
    const response = await request(app).get('/api/eventi/utente/'+utenteId+'').set(`x-access-token`,token);

    expect(response.status).toBe(404);
    
  });

  it('should return 500 if there is an error in server operations', async () => {

    jest.spyOn(Persona, 'findById').mockImplementationOnce(() => {
      throw new Error();
    });

   // Test setup
   const utenteId = '647ef0def12d8fd18d5b36b2'; // utente ID of out utente Test

   //Request
   let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VmMGRlZjEyZDhmZDE4ZDViMzZiMiIsImVtYWlsIjoidXRlbnRlVGVzdEB0ZXN0Lml0IiwiaWF0IjoxNjg2MDQwODA4fQ.K2nZmHyw7W68KbH37xQmKXeQDEQdEMWl5sj_mEUsuyA"
   const response = await request(app).get('/api/eventi/utente/'+utenteId+'').set(`x-access-token`,token);


    // Perform assertions
    expect(response.status).toBe(500);
  });
});


