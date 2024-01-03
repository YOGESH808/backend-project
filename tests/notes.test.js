const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

// Connect to MongoDB before running tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Close the MongoDB connection after all tests are done
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Notes Endpoints', () => {
    let authToken;
  
    beforeAll(async () => {
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'yogesh',
          password: 'agarwal',
        });
  
      authToken = loginResponse.body.token;
    });
  
    it('should create a new note', async () => {
      const response = await request(app)
        .post('/api/notes')
        .set('Authorization', `Bearer${authToken}`)
        .send({
          title: 'Sample Note',
          content: 'This is a sample note content.',
        });
  
      console.log('Test Case: should create a new note', response.body);
      expect(response.statusCode).toBe(201);
    });
  
    it('should not create a new note without authentication', async () => {
      const response = await request(app)
        .post('/api/notes')
        .send({
          title: 'Unauthorized Note',
          content: 'This note should not be created.',
        });
  
      console.log('Test Case: should not create a new note without authentication', response.body);
      expect(response.statusCode).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  
    it('should get a list of all notes', async () => {
      const response = await request(app)
        .get('/api/notes')
        .set('Authorization', `Bearer${authToken}`);
  
      console.log('Test Case: should get a list of all notes', response.body);
      expect(response.statusCode).toBe(200);
    });
  
    it('should update an existing note', async () => {
      const createNoteResponse = await request(app)
        .post('/api/notes')
        .set('Authorization', `Bearer${authToken}`)
        .send({
          title: 'Old Note',
          content: 'This is the old content.',
        });
        console.log(createNoteResponse.body)
        
      const noteId = createNoteResponse.body._id;
  
      const response = await request(app)
        .put(`/api/notes/${noteId}`)
        .set('Authorization', `Bearer${authToken}`)
        .send({
          title: 'Updated Note',
          content: 'This is the updated content.',
        });
  
      console.log('Test Case: should update an existing note', response.body);
      expect(response.statusCode).toBe(200);
    });
  
    it.only('should delete an existing note', async () => {
      const createNoteResponse = await request(app)
        .post('/api/notes')
        .set('Authorization', `Bearer${authToken}`)
        .send({
          title: 'Note to Delete',
          content: 'This note will be deleted.',
        });
        console.log(createNoteResponse.body)
      const noteId = createNoteResponse.body._id;
  
      const response = await request(app)
        .delete(`/api/notes/${noteId}`)
        .set('Authorization', `Bearer${authToken}`);
  
      console.log('Test Case: should delete an existing note', response.body);
      expect(response.statusCode).toBe(200);
    });
  
  });
  