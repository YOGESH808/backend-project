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

describe('Authentication Endpoints', () => {
  it('should signup a new user', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({ username: 'testus1er', password: 'testpassword' });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should login an existing user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'testpassword' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should return 401 for invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'nonexistentuser', password: 'wrongpassword' });
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });
});
