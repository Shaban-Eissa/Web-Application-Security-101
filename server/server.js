const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors"); // Import CORS

const app = express();

// Enable CORS for all origins (or specify your React app URL)
app.use(cors({ origin: "http://localhost:5173" }));

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

// Start the server
app.listen(5000, () => {
  console.log("Secure server running on http://localhost:5000");
});
