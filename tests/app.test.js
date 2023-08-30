const request = require('supertest');
const app = require('../server/server'); 

describe('POST /register', () => {
  it('registers a new user', async () => {
    const newUser = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'testpassword',
    };

    const response = await request(app)
      .post('/register')
      .send(newUser)
      .expect(201);

    expect(response.body.message).toBe('User registered successfully');
  });

  it('returns error for duplicate username', async () => {
    const existingUser = {
      email: 'existing@example.com',
      username: 'existinguser',
      password: 'existingpassword',
    };

    const response = await request(app)
      .post('/register')
      .send(existingUser)
      .expect(409);

    expect(response.body.error).toBe('Username already exists');
  });

  it('returns error for duplicate email', async () => {
    const existingEmail = {
      email: 'existing@example.com',
      username: 'newuser',
      password: 'newpassword',
    };

    const response = await request(app)
      .post('/register')
      .send(existingEmail)
      .expect(409);

    expect(response.body.error).toBe('Email already exists');
  });
});
