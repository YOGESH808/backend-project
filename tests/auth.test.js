const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app.js');

chai.use(chaiHttp);
const { expect } = chai;

describe('Authentication API', () => {
  it('should register a new user', async () => {
    const res = await chai.request(app).post('/api/auth/signup').send({
      username: 'testuser',
      password: 'testpassword',
    });
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('message').equal('User registered successfully');
  });

  it('should log in an existing user and return a token', async () => {
    const res = await chai.request(app).post('/api/auth/login').send({
      username: 'testuser',
      password: 'testpassword',
    });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');
  });
});
