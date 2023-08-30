const request = require('supertest');
const app = require('./server');
const database = require('./sqlConnection'); 
process.env.NODE_ENV = 'test';

// Clean up the database by removing all users
/*const cleanUpFunction = async (database) => {
  await database.query('DELETE FROM users');
};*/

describe('POST /register', () => {

 // Assuming you have a database connection already established
/*cleanUpFunction(database)
.then(() => {
  console.log('Database cleaned up successfully.');
})
.catch((error) => {
  console.error('Error cleaning up the database:', error);
});*/

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
      username: 'testuser',
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
      email: 'test@example.com',
      username: 'newuser',
      password: 'newpassword',
    };

    const response = await request(app)
      .post('/register')
      .send(existingEmail)
      .expect(409);

    expect(response.body.error).toBe('Email already exists');
  });

  afterAll(async () => {
    await database.query('DELETE FROM users');
    await database.end(); // Close the database connection pool
  });

});
