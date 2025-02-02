const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

let balance = 5000;

const csrfProtection = csrf({
  cookie: { httpOnly: true, secure: false, maxAge: 3600000 },
});

// Generate CSRF token for frontend use
app.get("/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.post("/transfer", csrfProtection, (req, res) => {
  const { amount, to } = req.body;

  if (typeof amount !== "number" || !to) {
    return res.status(400).json({ error: "Invalid transfer details" });
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
  console.log("Server running on http://localhost:5000");
});
