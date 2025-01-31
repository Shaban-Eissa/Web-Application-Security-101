const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

const csrfProtection = csrf({ cookie: true });

// Simulated bank balance
let balance = 5000;


// Generate CSRF token
app.get('/csrf-token', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
  });

app.post('/transfer', csrfProtection, (req, res) => {
  const { amount, to } = req.body;

  // Validate inputs
  if (typeof amount !== 'number' || !to) {
   
    // I want to return the error message to the client invalid CSRF token
    return res.status(400).json({ error: 'Invalid CSRF token' });
  }

  // Update balance
  balance -= amount;
  console.log(`Transferred $${amount} to ${to}. New balance: $${balance}`);
  res.send('Transfer complete! 💸');
});

app.get('/balance', (req, res) => {
  res.json({ balance });
});

app.listen(5000, () => {
  console.log('Vulnerable server running on http://localhost:5000');
});