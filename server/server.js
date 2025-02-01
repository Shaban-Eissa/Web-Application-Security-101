const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const secretKey = "your-very-secret-key";

app.use(cors());
app.use(bodyParser.json());

// Simulated user database
const users = [{ username: "admin", password: "password" }];

// Login endpoint: issues JWT token on successful login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    const token = jwt.sign({ username: user.username }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// Protected route: requires a valid JWT token
app.get("/protected", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get the token from Authorization header

  if (!token) {
    return res.status(403).send("Token required");
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid or expired token");
    }
    res.send("Protected resource accessed");
  });
});

let PORT = 5000;
app.listen(PORT, () => {
  console.log("Backend server running on http://localhost:5000");
});
