const express = require("express");
const app = express();

// No rate limiting
app.get("/api/data", (req, res) => {
  res.send("Sensitive data!");
});

app.listen(5000, () => {
  console.log("Vulnerable server running on http://localhost:5000");
});
