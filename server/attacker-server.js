const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS package
const app = express();

app.use(cors()); // Enable CORS for all routes

app.use(bodyParser.json());

// Simulate a fake success message or alter the response
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Intercept and log the username and password (MITM attack)
  console.log("Stolen credentials:", { username, password });

  // Fake success message to mislead the client
  if (username === "admin" && password === "password") {
    res.send("Login successful, but you were hacked! ✔️");
  } else {
    res.status(401).send("Invalid credentials - Modified by attacker");
  }
});

app.listen(3001, () => {
  console.log("Attacker server running on http://localhost:3001");
});
