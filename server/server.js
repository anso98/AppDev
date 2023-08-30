// server.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const database = require('./sqlConnection');

const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Define your API routes here
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
}

// Close the database connection pool when the server is shutting down
process.on('SIGINT', async () => {
    console.log('Closing database connection pool...');
    await database.end();
    console.log('Database connection pool closed.');
    process.exit();
  });

app.get('/api/data', (req, res) => {

    const data = {
      message: 'Hello from the API!'
    };
    res.json(data);
  
});

//const users = [];

// Register 
app.post('/register', async (req, res) => {
  try {

    console.log('Registration request received');

    const {email, username, password } = req.body;

    const connection = await database;

    // Check if username or email already exist
    const [existingUsername] = await connection.query('SELECT id FROM users WHERE username = ?', [username]);
    const [existingEmail] = await connection.query('SELECT id FROM users WHERE email = ?', [email]);

    if (existingUsername.length > 0) {
        return res.status(409).json({ error: 'Username already exists' });
    }
    
    if (existingEmail.length > 0) {
        return res.status(409).json({ error: 'Email already exists' });
    }

     // Hash the password
     const hashedPassword = await bcrypt.hash(password, 10);
  
    // Insert user data into the database
    await connection.query('INSERT INTO users (email, username, password) VALUES (?, ?, ?)', [email, username, hashedPassword]);
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user in the database (MySQL query)
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = app;

