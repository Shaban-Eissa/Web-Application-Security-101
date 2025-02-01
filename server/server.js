const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let balance = 5000;

// UNSAFE: No CSRF protection
app.post("/transfer", (req, res) => {
  const { amount, to } = req.body;

  // Validate inputs
  if (typeof amount !== "number" || !to) {
    return res.status(400).send("Invalid amount or recipient");
  }

  balance -= amount;
  console.log(`Transferred $${amount} to ${to}. New balance: $${balance}`);
  res.send("Transfer complete! 💸");
});

app.get("/balance", (req, res) => {
  res.json({ balance });
});

let PORT = 5000;
app.listen(PORT, () => {
  console.log("Vulnerable server running on http://localhost:5000");
});
