const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const app = express();

app.use(cors());

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res
      .status(429)
      .json({ error: "Too many requests! Please try again later." });
  },
});

app.use("/api/data", limiter); // Apply rate limit **only** to `/api/data`

app.get("/api/data", (req, res) => {
  res.send("Protected data!");
});

let PORT = 5000;
app.listen(PORT, () => {
  console.log("Secure server running on http://localhost:5000");
});
