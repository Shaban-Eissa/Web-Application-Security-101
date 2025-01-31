const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");
const sanitizeHtml = require("sanitize-html");

const app = express();
const db = new sqlite3.Database(":memory:"); // In-memory SQLite database

// Create comments table
db.serialize(() => {
  db.run("CREATE TABLE comments (id INTEGER PRIMARY KEY, text TEXT)");
});

app.use(bodyParser.json());
app.use(cors());

// Customize options to allow <img> with the onerror attribute
const options = {
  allowedTags: ["b", "i", "em", "strong", "a", "p", "img"], // Allow img tag
  allowedAttributes: {
    "*": ["href", "src", "alt", "title", "onerror"], // Allow onerror for img
  },
  allowedSchemes: ["http", "https", "data", "mailto"], // Allow URLs
};

app.post("/comments", (req, res) => {
  const cleanText = sanitizeHtml(req.body.text, options);
  db.run("INSERT INTO comments (text) VALUES (?)", [cleanText]);
  res.send("Clean note stored!");
});

app.get("/comments", (req, res) => {
  db.all("SELECT * FROM comments", (err, rows) => {
    if (err) return res.status(500).send("Error fetching comments");
    res.json(rows);
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
