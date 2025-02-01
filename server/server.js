const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const db = new sqlite3.Database(":memory:");

// Create comments table
db.serialize(() => {
  db.run("CREATE TABLE comments (id INTEGER PRIMARY KEY, text TEXT)");
});

app.use(bodyParser.json());
app.use(cors());

// Vulnerable route to store comments
app.post("/comments", (req, res) => {
  const { text } = req.body;
  db.run("INSERT INTO comments (text) VALUES (?)", [text], (err) => {
    if (err) return res.status(500).send("Error saving comment");
    res.send("Comment saved!");
  });
});

// Vulnerable route to fetch comments
app.get("/comments", (req, res) => {
  db.all("SELECT * FROM comments", (err, rows) => {
    if (err) return res.status(500).send("Error fetching comments");
    res.json(rows);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
