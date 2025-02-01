const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

const csrfProtection = csrf({ cookie: true });

let balance = 5000;

// Generate CSRF token
app.get("/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.post("/transfer", csrfProtection, (req, res) => {
  const { amount, to } = req.body;

  // Validate inputs
  if (typeof amount !== "number" || !to) {
    return res.status(400).json({ error: "Invalid CSRF token" });
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
