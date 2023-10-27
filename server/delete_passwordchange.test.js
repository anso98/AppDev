const request = require('supertest');
const app = require('./server');
const express = require('express');
const database = require('./sqlConnection'); 
process.env.NODE_ENV = 'test';

beforeAll(async () => {
    // Register a valid user at the top of the test suite
    const testUser = {
      email: 'test@example.com',
      username: 'test_username',
      password: 'test_password',
    };

    await request(app)
      .post('/register')
      .send(testUser)
      .expect(201);

    console.log("User succesfully registered")
});

describe('User Routes', () => {

  it('change user password', async () => {
    const response = await request(app)
      .put('/change-password/')
      .send({ newPassword: 'newPassword', email: 'test@example.com' }); // Provide an email that exists in your test database

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Password changed successfully');
  });

  it('test new password', async () => {
    const validUser = {
        identifier: 'test@example.com', // Username
        password: 'newPassword',
      };
  
      const response = await request(app)
        .post('/login')
        .send(validUser)
        .expect(200);
  
      console.log('Response Body:', response.body); // Log the response body
    });


  it('should delete a user profile by email', async () => {
    const response = await request(app)
      .delete('/delete-profile/')
      .send({ identifier: 'test@example.com' }); // Provide an email that exists in your test database

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User profile deleted successfully');
  });

  /*it('should delete a user profile by username', async () => {
    const response = await request(app)
      .delete('/delete-profile/')
      .send({ identifier: 'testuser' }); // Provide a username that exists in your test database

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User profile deleted successfully');
  });*/

  afterAll(async () => {
    await database.query('DELETE FROM users');
    await database.end(); // Close the database connection pool
  });

  // Add more test cases as needed
});