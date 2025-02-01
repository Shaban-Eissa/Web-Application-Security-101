const express = require("express");
const app = express();

// No rate limiting
app.get("/api/data", (req, res) => {
  res.send("Sensitive data!");
});

let PORT = 5000;
app.listen(PORT, () => {
  console.log("Vulnerable server running on http://localhost:5000");
});
