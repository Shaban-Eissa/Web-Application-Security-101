const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const db = new sqlite3.Database(":memory:");

// Initialize users table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);
  db.run(`
    INSERT INTO users (username, password) 
    VALUES ('admin', 'password123')
  `);
});

app.use(bodyParser.json());
app.use(cors());

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // SAFE: Parameterized query
  const query = `SELECT * FROM users WHERE username = ? AND password = ?`;

  db.get(query, [username, password], (err, user) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).send("Error logging in");
    }
    if (user) res.send("Login successful! 🔒");
    else res.send("Invalid credentials ❌");
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
