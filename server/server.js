const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

// Simulate a user database
const users = [{ username: "admin", password: "password" }];

// Victim login endpoint - will never be directly accessed due to MITM
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.send("Login successful!");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

app.listen(5000, () => {
  console.log("Victim server running on http://localhost:5000");
});
