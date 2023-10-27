// server.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const database = require('./sqlConnection');

const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 5000;

const secretKey = process.env.JWT_SECRET_KEY;


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

// Login
app.post('/login', async (req, res) => {
    try {
      const { identifier, password } = req.body;

      console.log(identifier)
      console.log(password)
  
      const connection = await database; // Establish database connection
      
      // Find user in the database by email or username
      const [userDataByEmail] = await connection.query('SELECT * FROM users WHERE email = ?', [identifier]);
      const [userDataByUsername] = await connection.query('SELECT * FROM users WHERE username = ?', [identifier]);
      
      const userData = userDataByEmail.length > 0 ? userDataByEmail : userDataByUsername;
      
      console.log("Userdata:", userData)
      
      if (!userData || userData.length === 0) {
        console.log("Invalid credentials")
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const user = userData[0];
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        console.log("Invalid password")
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
      
      res.status(200).json({ token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

// THOUGHTS: should only work if validated that user is loged in! Not everyone should be able to call this endpoint!
// Delete user profile
app.delete('/delete-profile/', async (req, res) => {
    try{
        const identifier = req.body.identifier; // This can be either email or username
        const deleteQuery = 'DELETE FROM users WHERE email = ? OR username = ?';
        
        await database.query(deleteQuery, [identifier, identifier]);
        
        return res.status(200).json({ message: 'User profile deleted successfully'});
    } catch (error) {
        console.error('Error deleting user profile:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
    
});

// THOUGHTS: Should be with email validation - sending email to validate password change! to be more secure!
// Change user password
app.put('/change-password/', async (req, res) => {
    try{
        const email = req.body.email;
        const newPassword = req.body.newPassword;

        // Hash the password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const query = 'UPDATE users SET password = ? WHERE email = ?';
    
        console.log("Within change password function", email, newPassword);

        await database.query(query, [hashedPassword, email]) 

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) { 
        console.error('Error changing password', error);
        res.status(500).json({ error: 'Internal server error' });
  
    }
    
});
  

module.exports = app;

