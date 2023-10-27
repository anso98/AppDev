const request = require('supertest');
const app = require('./server');
const express = require('express');
const database = require('./sqlConnection'); 
process.env.NODE_ENV = 'test';

describe('Login and Register Endpoint', () => {
    
    let authToken; // Store the authentication token

    beforeAll(async () => {
      // Register a valid user at the top of the test suite
      const validUser = {
        email: 'valid@example.com',
        username: 'valid_username',
        password: 'valid_password',
        // Add other registration data as needed
      };
  
      await request(app)
        .post('/register')
        .send(validUser)
        .expect(201);
  
      // Authenticate and get the token
      const loginData = {
        identifier: 'valid@example.com', // Email address
        password: 'valid_password',
      };
  
      const response = await request(app)
        .post('/login')
        .send(loginData);
  
      authToken = response.body.token;
      console.log(authToken);
    });
  
    
  it('should return a valid token for valid email and password', async () => {
    const validUser = {
        identifier: 'valid@example.com', // email test 
      password: 'valid_password',
    };

    const response = await request(app)
      .post('/login')
      .send(validUser)
      .expect(200);

    console.log('Response Body:', response.body); // Log the response body
    expect(response.body).toHaveProperty('token');
  });

  it('should return a valid token for valid username and password', async () => {
    const validUser = {
      identifier: 'valid_username', // Username
      password: 'valid_password',
    };

    const response = await request(app)
      .post('/login')
      .send(validUser)
      .expect(200);

    console.log('Response Body:', response.body); // Log the response body
    expect(response.body).toHaveProperty('token');
  });

  it('should return 401 for invalid credentials', async () => {
    const invalidUser = {
      identifier: 'invalid@example.com',
      password: 'invalid_password',
    };

    const response = await request(app)
      .post('/login')
      .send(invalidUser)
      .expect(401);

    console.log('Response Status:', response.status); // Log the response status

  });

  afterAll(async () => {
    await database.query('DELETE FROM users');
    await database.end(); // Close the database connection pool
  });

  // Add more test cases as needed
});
