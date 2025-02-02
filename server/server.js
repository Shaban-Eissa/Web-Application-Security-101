const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const secretKey = "your-very-secret-key";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

// Simulated user database
const users = [{ username: "admin", password: "password" }];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    const token = jwt.sign({ username: user.username }, secretKey, {
      expiresIn: "1h",
    });

    res.cookie("authToken", token, {
      httpOnly: true, // Cannot be accessed via JavaScript
      sameSite: "Strict", // Prevents the cookie from being sent in cross-site requests
      maxAge: 3600000, // 1 hour expiration
    });

    res.json({ message: "Login successful" });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// Protected route: requires a valid JWT token
app.get("/protected", (req, res) => {
  const token = req.cookies["authToken"];

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
