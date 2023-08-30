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

app.get('/api/data', (req, res) => {

    const data = {
      message: 'Hello from the API!'
    };
    res.json(data);
  
});

// Old probably to be deleted?
/*app.get("/createDatabase", (req, res) => {
  
    let databaseName = "gfg_db";
  
    let createQuery = `CREATE DATABASE ${databaseName}`;
  
    // use the query to create a Database.
    database.query(createQuery, (err) => {
        if(err) throw err;
  
        console.log("Database Created Successfully !");
  
        let useQuery = `USE ${databaseName}`;
        database.query(useQuery, (error) => {
            if(error) throw error;
  
            console.log("Using Database");
              
            return res.send(
        `Created and Using ${databaseName} Database`);
        })
    });
});*/

//const users = [];

// Register 
app.post('/register', async (req, res) => {
  try {

    console.log('Registration request received');

    const {email, username, password } = req.body;

    // Create a database connection
    console.log('Before connection to database');

    const connection = await database.connect((err) => {
        if (err) {
        connection.end()
          console.log("Database Connection Failed !!!", err);
        } else {
          console.log("connected to Database");
        }
     });

    //const connection = await database.connect();

     console.log("after if formula of connection")

    // Check if username or email already exist
    const [existingUsername] = await connection.query('SELECT id FROM users WHERE username = ?', [username]);
    const [existingEmail] = await connection.query('SELECT id FROM users WHERE email = ?', [email]);

    if (existingUsername.length > 0) {
        connection.end();
        return res.status(409).json({ error: 'Username already exists' });
    }
    
    if (existingEmail.length > 0) {
        connection.end();
        return res.status(409).json({ error: 'Email already exists' });
    }

     // Hash the password
     const hashedPassword = await bcrypt.hash(password, 10);
  
    // Insert user data into the database
    await connection.query('INSERT INTO users (email, username, password) VALUES (?, ?, ?)', [email, username, hashedPassword]);

    connection.end();
    
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

