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
  it('should create a new user account', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'yogeshagarwal', password: 'testpassword'
      });
    expect(response.statusCode).toBe(201);
  });

  it('should not create a new user account with duplicate username', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'testuser101', password: 'testpassword'
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should log in to an existing user account and receive an access token', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'yogesh', password: 'agarwal'
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should not log in with incorrect credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'yogesh', password: 'agadrwal'
      });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  it('should handle rate limiting during authentication', async () => {
    //rate limit is set to 10
    for(let i = 0;i<10;i++)
    {
      const response1 = await request(app)
      .post('/api/auth/login')
      .send({
        username: `yogesh`, password: 'agarwal'
      });
      console.log(response1.body);
      expect(response1.statusCode).toBe(200);
    }
   
  
    const response2 = await request(app)
      .post('/api/auth/login')
      .send({
        username: `yogesh`, password: 'agarwal'
      });
    // Expect the second request to be rate-limited
    expect(response2.statusCode).toBe(429);
  });
});
