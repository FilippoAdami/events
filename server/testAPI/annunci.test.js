const { mockRequest, mockResponse } = require('jest-mock-req-res');
const request = require('supertest');
const app = require('../server');
const Annuncio = require('../models/annuncioM');
const mongoose = require('mongoose');
const {getAnnuncio} = require('../routes/annunciR');



// Test suite for the GET '/api/annunci' path
describe('GET /api/annunci', () => {
  // Test to check if all annunci are returned successfully
  test('should return all annunci', async () => {
    // Send a GET request to the '/api/annunci' endpoint
    const response = await request(app).get('/api/annunci');

    // Assert that the response status is 200 (OK)
    expect(response.status).toBe(200);
  });

  // Test to check if the server returns a 500 status code when an error occurs
  test('should return 500 if an error occurs', async () => {
    // Mock the 'find' method of the 'Annuncio' model to throw an error
    jest.spyOn(Annuncio, 'find').mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    // Send a GET request to the '/api/annunci' endpoint
    const response = await request(app).get('/api/annunci');

    // Assert that the response status is 500 (Internal Server Error)
    expect(response.status).toBe(500);

    // Assert that the response body contains the expected error message
    expect(response.body.message).toBe('Test error');
  });
});








// Test suite for the POST '/api/annunci' path (with tokenChecker)
describe('POST /api/annunci', () => {
    // Test to check if a new annuncio is created successfully
    test('should create a new annuncio', async () => {
        // Mock the 'save' method of the 'Annuncio' model
        jest.spyOn(Annuncio.prototype, 'save').mockImplementationOnce(() => {});
    
        //token valido ed ID dell'utente Test (token settato che non scada mai) 
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlZjBkZWYxMmQ4ZmQxOGQ1YjM2YjIiLCJlbWFpbCI6InV0ZW50ZVRlc3RAdGVzdC5pdCIsInBhc3N3b3JkIjoiJDJiJDEwJGpTWENDRHI0SWxQQkRsZ3BTRWFYQU9MY05YejNiTzB0Rk5FeVJ0QnRrbHEwazBBeS5icHdTIiwicnVvbG8iOiJwZXJzb25hIiwibm9tZSI6InRlc3QiLCJjb2dub21lIjoidGVzdCIsInRlbGVmb25vIjowLCJkYXRhTmFzY2l0YSI6IjE5OTktMTItMzFUMjM6MDA6MDAuMDAwWiIsImV2ZW50aVB1YmJsaWNhdGkiOlsiNjQ4MGFhZTMwMDlmZmNlODAzNDhmMWFiIl0sInByZW5vdGF6aW9uaSI6WyI2NDY5ZGM2NTgwNTU4MTgxY2Q4OTY4ZmIiXSwiYW5udW5jaVB1YmJsaWNhdGkiOltdLCJfX3YiOjAsImlhdCI6MTY4NjIzNTUwM30.RPUoc26pvh2UVwqtNPBDonMYLFM40UXSmMu0FzCnxbg'

        const response = await request(app).post('/api/annunci').set(`x-access-token`,token);
    
        // Assert that the response status is 201 (Created)
        expect(response.status).toBe(201);
    });
    
    // Test to check if the server returns a 400 status code when an error occurs
    test('should return 400 if an error occurs', async () => {
        // Mock the 'save' method of the 'Annuncio' model to throw an error
        jest.spyOn(Annuncio.prototype, 'save').mockImplementationOnce(() => {
          const errore = new Error('Test error');
          throw errore;
        });
    
        try {
        // Send a POST request to the '/api/annunci' endpoint
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlZjBkZWYxMmQ4ZmQxOGQ1YjM2YjIiLCJlbWFpbCI6InV0ZW50ZVRlc3RAdGVzdC5pdCIsInBhc3N3b3JkIjoiJDJiJDEwJGpTWENDRHI0SWxQQkRsZ3BTRWFYQU9MY05YejNiTzB0Rk5FeVJ0QnRrbHEwazBBeS5icHdTIiwicnVvbG8iOiJwZXJzb25hIiwibm9tZSI6InRlc3QiLCJjb2dub21lIjoidGVzdCIsInRlbGVmb25vIjowLCJkYXRhTmFzY2l0YSI6IjE5OTktMTItMzFUMjM6MDA6MDAuMDAwWiIsImV2ZW50aVB1YmJsaWNhdGkiOlsiNjQ4MGFhZTMwMDlmZmNlODAzNDhmMWFiIl0sInByZW5vdGF6aW9uaSI6WyI2NDY5ZGM2NTgwNTU4MTgxY2Q4OTY4ZmIiXSwiYW5udW5jaVB1YmJsaWNhdGkiOltdLCJfX3YiOjAsImlhdCI6MTY4NjIzNTUwM30.RPUoc26pvh2UVwqtNPBDonMYLFM40UXSmMu0FzCnxbg'
        const response = await request(app).post('/api/annunci').set(`x-access-token`,token);
    
        // Assert that the response status is 400 (Bad Request)
        expect(response.status).toBe(400);
        const receivedErrorMessage = JSON.parse(response.error.text); // Parse the error message from the response
        expect(receivedErrorMessage).toBe('Test error'); // Compare without double quotes

        } catch (error) {
        console.error('Test error:', error);
        throw error;
        }
    });

    test('should return 403 if in the request is not define token ', async () => {
      jest.spyOn(Annuncio.prototype, 'save').mockImplementationOnce(() => {});
        
      // Send a POST request to the '/api/annunci' endpoint
     
      const response = await request(app).post('/api/annunci')
 
  
      expect(response.status).toBe(403);
      expect(response.body.errormessage).toBe('Token assente');

    });
    
    //Testing error 403
    test('should return 403 with error in the token', async () => {
      jest.spyOn(Annuncio.prototype, 'save').mockImplementationOnce(() => {});
        
      let token = "errore"
      
      // Send a POST request to the '/api/annucni' endpoint
      const response = await request(app).post('/api/annunci').set(`x-access-token`,token);
      console.log(response.body);

      // Assert that the response status is 201 (Created)
      expect(response.status).toBe(403);
      expect(response.body.message).toBe('Unauthorized access');
       
    });



});








// Test suite for the GET '/api/annunci/:id' path
describe('GET /api/annunci/:id', () => {
  test('should return the annuncio if it exists', async () => {
    // Create a sample annuncio
    const annuncio = new Annuncio({
      id_publisher: '647237535592096d9ae27a3a',
      title: 'Test Annuncio',
      description: 'This is a test annuncio',
      time: 31,
    });
    await annuncio.save();

    // Send a GET request to the '/api/annunci/:id' endpoint
    const response = await request(app).get(`/api/annunci/${annuncio._id}`);

    // Assert that the response status is 200 (OK)
    expect(response.status).toBe(200);

    // Assert that the response body matches the expected annuncio
    //console.log(response.body);
    expect(response.body).toEqual({
      __v: 0,
      _id: annuncio._id.toString(),
      clicks: 0,
      views: 0,
      date: annuncio.date.toISOString(),
      id_publisher: '647237535592096d9ae27a3a',
      title: 'Test Annuncio',
      description: 'This is a test annuncio',
      time: 31,
    });

    await annuncio.deleteOne();
  });

  test('should return 404 if the annuncio is not found', async () => {
    // Send a GET request to the '/api/annunci/:id' endpoint with an invalid ID
    // Create a valid ObjectId
    const validObjectId = '645d3111aafe7fd3672f9900';
    const response = await request(app).get('/api/annunci/'+validObjectId+'');

    // Assert that the response status is 404 (Not Found)
    expect(response.status).toBe(404);
    expect(response.text).toBe('Annuncio not found');

    // ... perform other assertions ...
  });

  test('should return 500 if an error occurs', async () => {
    // Mock the 'findById' method of the 'Annuncio' model to throw an error
    jest.spyOn(Annuncio, 'findById').mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    // Send a GET request to the '/api/annunci/:id' endpoint
    const response = await request(app).get('/api/annunci/some-id');

    // Assert that the response status is 500 (Internal Server Error)
    expect(response.status).toBe(500);
    expect(response.text).toBe('Server error');

    // ... perform other assertions ...
  });
});








// Test suite for the GET '/api/annunci/publisher/:publisher_id' path
describe('GET /api/annunci/publisher/:publisher_id', () => {
  test('should return all annunci published by a specific publisher', async () => {
    
    //token valido ed ID dell'utente Test (token settato che non scada mai) 
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlZjBkZWYxMmQ4ZmQxOGQ1YjM2YjIiLCJlbWFpbCI6InV0ZW50ZVRlc3RAdGVzdC5pdCIsInBhc3N3b3JkIjoiJDJiJDEwJGpTWENDRHI0SWxQQkRsZ3BTRWFYQU9MY05YejNiTzB0Rk5FeVJ0QnRrbHEwazBBeS5icHdTIiwicnVvbG8iOiJwZXJzb25hIiwibm9tZSI6InRlc3QiLCJjb2dub21lIjoidGVzdCIsInRlbGVmb25vIjowLCJkYXRhTmFzY2l0YSI6IjE5OTktMTItMzFUMjM6MDA6MDAuMDAwWiIsImV2ZW50aVB1YmJsaWNhdGkiOlsiNjQ4MGFhZTMwMDlmZmNlODAzNDhmMWFiIl0sInByZW5vdGF6aW9uaSI6WyI2NDY5ZGM2NTgwNTU4MTgxY2Q4OTY4ZmIiXSwiYW5udW5jaVB1YmJsaWNhdGkiOltdLCJfX3YiOjAsImlhdCI6MTY4NjIzNTUwM30.RPUoc26pvh2UVwqtNPBDonMYLFM40UXSmMu0FzCnxbg'
    let id_utente_test = "647ef0def12d8fd18d5b36b2"


    const response = await request(app).get(`/api/annunci/publisher/${id_utente_test}`).set(`x-access-token`,token);

    //console.log(response.body);

    expect(response.status).toBe(200);
    response.body.forEach(annuncio => {
      expect(annuncio.id_publisher).toBe(id_utente_test);
    });
    
  });

  test('should return 403 if unauthorized access', async () => {

    //token valido ed ID dell'utente Test (token settato che non scada mai) 
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlZjBkZWYxMmQ4ZmQxOGQ1YjM2YjIiLCJlbWFpbCI6InV0ZW50ZVRlc3RAdGVzdC5pdCIsInBhc3N3b3JkIjoiJDJiJDEwJGpTWENDRHI0SWxQQkRsZ3BTRWFYQU9MY05YejNiTzB0Rk5FeVJ0QnRrbHEwazBBeS5icHdTIiwicnVvbG8iOiJwZXJzb25hIiwibm9tZSI6InRlc3QiLCJjb2dub21lIjoidGVzdCIsInRlbGVmb25vIjowLCJkYXRhTmFzY2l0YSI6IjE5OTktMTItMzFUMjM6MDA6MDAuMDAwWiIsImV2ZW50aVB1YmJsaWNhdGkiOlsiNjQ4MGFhZTMwMDlmZmNlODAzNDhmMWFiIl0sInByZW5vdGF6aW9uaSI6WyI2NDY5ZGM2NTgwNTU4MTgxY2Q4OTY4ZmIiXSwiYW5udW5jaVB1YmJsaWNhdGkiOltdLCJfX3YiOjAsImlhdCI6MTY4NjIzNTUwM30.RPUoc26pvh2UVwqtNPBDonMYLFM40UXSmMu0FzCnxbg'
    let id_utente_test = "000ef0def12d8fd18d5b36b0" // ID diverso dall'utente Test


    const response = await request(app).get(`/api/annunci/publisher/${id_utente_test}`).set(`x-access-token`,token);

    expect(response.status).toBe(403);
    expect(response.text).toBe('Unauthorized access');
  });

  test('should return 500 if an error occurs', async () => {
    // Mock the find method to throw an error
    jest.spyOn(Annuncio, 'find').mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    //token valido ed ID dell'utente Test (token settato che non scada mai) 
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlZjBkZWYxMmQ4ZmQxOGQ1YjM2YjIiLCJlbWFpbCI6InV0ZW50ZVRlc3RAdGVzdC5pdCIsInBhc3N3b3JkIjoiJDJiJDEwJGpTWENDRHI0SWxQQkRsZ3BTRWFYQU9MY05YejNiTzB0Rk5FeVJ0QnRrbHEwazBBeS5icHdTIiwicnVvbG8iOiJwZXJzb25hIiwibm9tZSI6InRlc3QiLCJjb2dub21lIjoidGVzdCIsInRlbGVmb25vIjowLCJkYXRhTmFzY2l0YSI6IjE5OTktMTItMzFUMjM6MDA6MDAuMDAwWiIsImV2ZW50aVB1YmJsaWNhdGkiOlsiNjQ4MGFhZTMwMDlmZmNlODAzNDhmMWFiIl0sInByZW5vdGF6aW9uaSI6WyI2NDY5ZGM2NTgwNTU4MTgxY2Q4OTY4ZmIiXSwiYW5udW5jaVB1YmJsaWNhdGkiOltdLCJfX3YiOjAsImlhdCI6MTY4NjIzNTUwM30.RPUoc26pvh2UVwqtNPBDonMYLFM40UXSmMu0FzCnxbg'
    let id_utente_test = "647ef0def12d8fd18d5b36b2"


    const response = await request(app).get(`/api/annunci/publisher/${id_utente_test}`).set(`x-access-token`,token);

    expect(response.status).toBe(500);
    expect(response.error.text).toBe('Test error');
  });
});








// Test suite for the DELETE '/api/annunci/:id' path
describe('DELETE /api/annunci/:id', () => {
  test('should delete an annuncio given its id', async () => {
    // Create a sample annuncio
    const annuncio = new Annuncio({
      id_publisher: '647ef0def12d8fd18d5b36b2',
      title: 'Test Annuncio',
      description: 'This is a test annuncio',
      time: 31,
    });
    await annuncio.save();

    //token valido ed ID dell'utente Test (token settato che non scada mai) 
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlZjBkZWYxMmQ4ZmQxOGQ1YjM2YjIiLCJlbWFpbCI6InV0ZW50ZVRlc3RAdGVzdC5pdCIsInBhc3N3b3JkIjoiJDJiJDEwJGpTWENDRHI0SWxQQkRsZ3BTRWFYQU9MY05YejNiTzB0Rk5FeVJ0QnRrbHEwazBBeS5icHdTIiwicnVvbG8iOiJwZXJzb25hIiwibm9tZSI6InRlc3QiLCJjb2dub21lIjoidGVzdCIsInRlbGVmb25vIjowLCJkYXRhTmFzY2l0YSI6IjE5OTktMTItMzFUMjM6MDA6MDAuMDAwWiIsImV2ZW50aVB1YmJsaWNhdGkiOlsiNjQ4MGFhZTMwMDlmZmNlODAzNDhmMWFiIl0sInByZW5vdGF6aW9uaSI6WyI2NDY5ZGM2NTgwNTU4MTgxY2Q4OTY4ZmIiXSwiYW5udW5jaVB1YmJsaWNhdGkiOltdLCJfX3YiOjAsImlhdCI6MTY4NjIzNTUwM30.RPUoc26pvh2UVwqtNPBDonMYLFM40UXSmMu0FzCnxbg'
  
    const response = await request(app).delete(`/api/annunci/${annuncio._id}`).set(`x-access-token`,token);

    expect(response.status).toBe(200);
    expect(response.text).toBe('Annuncio deleted successfully');
  });

  test('should return 403 if unauthorized access', async () => {
    // Create a sample annuncio
    const annuncio = new Annuncio({
      id_publisher: '1',
      title: 'Test Annuncio',
      description: 'This is a test annuncio',
      time: 31,
    });
    await annuncio.save();

    //token valido ed ID dell'utente Test (token settato che non scada mai) 
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlZjBkZWYxMmQ4ZmQxOGQ1YjM2YjIiLCJlbWFpbCI6InV0ZW50ZVRlc3RAdGVzdC5pdCIsInBhc3N3b3JkIjoiJDJiJDEwJGpTWENDRHI0SWxQQkRsZ3BTRWFYQU9MY05YejNiTzB0Rk5FeVJ0QnRrbHEwazBBeS5icHdTIiwicnVvbG8iOiJwZXJzb25hIiwibm9tZSI6InRlc3QiLCJjb2dub21lIjoidGVzdCIsInRlbGVmb25vIjowLCJkYXRhTmFzY2l0YSI6IjE5OTktMTItMzFUMjM6MDA6MDAuMDAwWiIsImV2ZW50aVB1YmJsaWNhdGkiOlsiNjQ4MGFhZTMwMDlmZmNlODAzNDhmMWFiIl0sInByZW5vdGF6aW9uaSI6WyI2NDY5ZGM2NTgwNTU4MTgxY2Q4OTY4ZmIiXSwiYW5udW5jaVB1YmJsaWNhdGkiOltdLCJfX3YiOjAsImlhdCI6MTY4NjIzNTUwM30.RPUoc26pvh2UVwqtNPBDonMYLFM40UXSmMu0FzCnxbg'

    const response = await request(app).delete(`/api/annunci/${annuncio._id}`).set(`x-access-token`,token);

    expect(response.status).toBe(403);
    expect(response.text).toContain('Unauthorized access');

    await annuncio.deleteOne()
  });

  test('should return 404 if the annuncio deas not exist', async () => {

    //token valido ed ID dell'utente Test (token settato che non scada mai) 
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlZjBkZWYxMmQ4ZmQxOGQ1YjM2YjIiLCJlbWFpbCI6InV0ZW50ZVRlc3RAdGVzdC5pdCIsInBhc3N3b3JkIjoiJDJiJDEwJGpTWENDRHI0SWxQQkRsZ3BTRWFYQU9MY05YejNiTzB0Rk5FeVJ0QnRrbHEwazBBeS5icHdTIiwicnVvbG8iOiJwZXJzb25hIiwibm9tZSI6InRlc3QiLCJjb2dub21lIjoidGVzdCIsInRlbGVmb25vIjowLCJkYXRhTmFzY2l0YSI6IjE5OTktMTItMzFUMjM6MDA6MDAuMDAwWiIsImV2ZW50aVB1YmJsaWNhdGkiOlsiNjQ4MGFhZTMwMDlmZmNlODAzNDhmMWFiIl0sInByZW5vdGF6aW9uaSI6WyI2NDY5ZGM2NTgwNTU4MTgxY2Q4OTY4ZmIiXSwiYW5udW5jaVB1YmJsaWNhdGkiOltdLCJfX3YiOjAsImlhdCI6MTY4NjIzNTUwM30.RPUoc26pvh2UVwqtNPBDonMYLFM40UXSmMu0FzCnxbg'

    const response = await request(app).delete(`/api/annunci/645cf5721dd165875a1417f0`).set(`x-access-token`,token);;
    
    expect(response.status).toBe(404);
    expect(response.text).toContain('Annuncio non trovato');
  });

  test('should return 500 if an error occurs in the server', async () => {
    // Mock the deleteOne method to throw an error
    jest.spyOn(Annuncio.prototype, 'deleteOne').mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    //token valido ed ID dell'utente Test (token settato che non scada mai) 
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlZjBkZWYxMmQ4ZmQxOGQ1YjM2YjIiLCJlbWFpbCI6InV0ZW50ZVRlc3RAdGVzdC5pdCIsInBhc3N3b3JkIjoiJDJiJDEwJGpTWENDRHI0SWxQQkRsZ3BTRWFYQU9MY05YejNiTzB0Rk5FeVJ0QnRrbHEwazBBeS5icHdTIiwicnVvbG8iOiJwZXJzb25hIiwibm9tZSI6InRlc3QiLCJjb2dub21lIjoidGVzdCIsInRlbGVmb25vIjowLCJkYXRhTmFzY2l0YSI6IjE5OTktMTItMzFUMjM6MDA6MDAuMDAwWiIsImV2ZW50aVB1YmJsaWNhdGkiOlsiNjQ4MGFhZTMwMDlmZmNlODAzNDhmMWFiIl0sInByZW5vdGF6aW9uaSI6WyI2NDY5ZGM2NTgwNTU4MTgxY2Q4OTY4ZmIiXSwiYW5udW5jaVB1YmJsaWNhdGkiOltdLCJfX3YiOjAsImlhdCI6MTY4NjIzNTUwM30.RPUoc26pvh2UVwqtNPBDonMYLFM40UXSmMu0FzCnxbg'
    const annuncioId = '645cf4ceeeaea6d856022104'; // Replace with the annuncio ID publishe by the user define in the token you want to delete
    
    const response = await request(app).delete(`/api/annunci/${annuncioId}`).set(`x-access-token`,token);
    
    expect(response.status).toBe(500);
    expect(response.text).toBe('errore al server in delete annuncio');
  });
});









// Test suite for the PATCH '/api/annunci/:id' path
describe('PATCH /annunci/:id', () => {
  test('should update an annuncio successfully', async () => {
    // Create a sample annuncio
    const annuncio = new Annuncio({
      id_publisher: '647ef0def12d8fd18d5b36b2',
      title: 'Test Annuncio',
      description: 'This is a test annuncio',
      time: 31,
    });
    await annuncio.save();

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlZjBkZWYxMmQ4ZmQxOGQ1YjM2YjIiLCJlbWFpbCI6InV0ZW50ZVRlc3RAdGVzdC5pdCIsInBhc3N3b3JkIjoiJDJiJDEwJGpTWENDRHI0SWxQQkRsZ3BTRWFYQU9MY05YejNiTzB0Rk5FeVJ0QnRrbHEwazBBeS5icHdTIiwicnVvbG8iOiJwZXJzb25hIiwibm9tZSI6InRlc3QiLCJjb2dub21lIjoidGVzdCIsInRlbGVmb25vIjowLCJkYXRhTmFzY2l0YSI6IjE5OTktMTItMzFUMjM6MDA6MDAuMDAwWiIsImV2ZW50aVB1YmJsaWNhdGkiOlsiNjQ4MGFhZTMwMDlmZmNlODAzNDhmMWFiIl0sInByZW5vdGF6aW9uaSI6WyI2NDY5ZGM2NTgwNTU4MTgxY2Q4OTY4ZmIiXSwiYW5udW5jaVB1YmJsaWNhdGkiOltdLCJfX3YiOjAsImlhdCI6MTY4NjIzNTUwM30.RPUoc26pvh2UVwqtNPBDonMYLFM40UXSmMu0FzCnxbg'
    const response = await request(app).patch(`/api/annunci/${annuncio._id}`).set(`x-access-token`,token).send({ title: 'Updated title'});

    expect(response.status).toBe(200);

    // Assert the response body
    expect(response.body).toEqual({
      __v: 0,
      _id: annuncio._id.toString(),
      clicks: 0,
      views: 0,
      date: annuncio.date.toISOString(),
      id_publisher: '647ef0def12d8fd18d5b36b2',
      title: 'Updated title',
      description: 'This is a test annuncio',
      time: 31,
    });

    await annuncio.deleteOne()
  });

  test('should return 403 if unauthorized access', async () => {
    // Create a sample annuncio
    const annuncio = new Annuncio({
      id_publisher: '1',
      title: 'Test Annuncio',
      description: 'This is a test annuncio',
      time: 31,
    });
    await annuncio.save();

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlZjBkZWYxMmQ4ZmQxOGQ1YjM2YjIiLCJlbWFpbCI6InV0ZW50ZVRlc3RAdGVzdC5pdCIsInBhc3N3b3JkIjoiJDJiJDEwJGpTWENDRHI0SWxQQkRsZ3BTRWFYQU9MY05YejNiTzB0Rk5FeVJ0QnRrbHEwazBBeS5icHdTIiwicnVvbG8iOiJwZXJzb25hIiwibm9tZSI6InRlc3QiLCJjb2dub21lIjoidGVzdCIsInRlbGVmb25vIjowLCJkYXRhTmFzY2l0YSI6IjE5OTktMTItMzFUMjM6MDA6MDAuMDAwWiIsImV2ZW50aVB1YmJsaWNhdGkiOlsiNjQ4MGFhZTMwMDlmZmNlODAzNDhmMWFiIl0sInByZW5vdGF6aW9uaSI6WyI2NDY5ZGM2NTgwNTU4MTgxY2Q4OTY4ZmIiXSwiYW5udW5jaVB1YmJsaWNhdGkiOltdLCJfX3YiOjAsImlhdCI6MTY4NjIzNTUwM30.RPUoc26pvh2UVwqtNPBDonMYLFM40UXSmMu0FzCnxbg'
    const response = await request(app).patch(`/api/annunci/${annuncio._id}`).set(`x-access-token`,token).send({ title: 'Updated title'});


    expect(response.status).toBe(403);
    expect(response.text).toContain('Unauthorized access');

    await annuncio.deleteOne()
  });

  test('should return 500 if an error occurs during the update', async () => {
    // Mock the deleteOne method to throw an error
    jest.spyOn(Annuncio.prototype, 'save').mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    const annuncioId = '645cf4ceeeaea6d856022104'; 
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlZjBkZWYxMmQ4ZmQxOGQ1YjM2YjIiLCJlbWFpbCI6InV0ZW50ZVRlc3RAdGVzdC5pdCIsInBhc3N3b3JkIjoiJDJiJDEwJGpTWENDRHI0SWxQQkRsZ3BTRWFYQU9MY05YejNiTzB0Rk5FeVJ0QnRrbHEwazBBeS5icHdTIiwicnVvbG8iOiJwZXJzb25hIiwibm9tZSI6InRlc3QiLCJjb2dub21lIjoidGVzdCIsInRlbGVmb25vIjowLCJkYXRhTmFzY2l0YSI6IjE5OTktMTItMzFUMjM6MDA6MDAuMDAwWiIsImV2ZW50aVB1YmJsaWNhdGkiOlsiNjQ4MGFhZTMwMDlmZmNlODAzNDhmMWFiIl0sInByZW5vdGF6aW9uaSI6WyI2NDY5ZGM2NTgwNTU4MTgxY2Q4OTY4ZmIiXSwiYW5udW5jaVB1YmJsaWNhdGkiOltdLCJfX3YiOjAsImlhdCI6MTY4NjIzNTUwM30.RPUoc26pvh2UVwqtNPBDonMYLFM40UXSmMu0FzCnxbg'
    const response = await request(app).patch(`/api/annunci/${annuncioId}`).set(`x-access-token`,token).send({ title: 'Updated title'});

    
    expect(response.status).toBe(500);
    expect(response.text).toBe('Server error');
  });
});
