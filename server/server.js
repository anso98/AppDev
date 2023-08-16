// server.js

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Define your API routes here

app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}`);

});

app.get('/api/data', (req, res) => {

    const data = {
  
      message: 'Hello from the API!'
  
    };
  
    res.json(data);
  
  });

  app.get("/createDatabase", (req, res) => {
  
    let databaseName = "UserNames";
  
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
});