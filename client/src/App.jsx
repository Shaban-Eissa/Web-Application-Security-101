import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

import FakeAd from "./FakeAd";

import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fake-ad" element={<FakeAd />} />
      </Routes>
    </Router>
  );
}

function Home() {
  const [amount, setAmount] = useState(100);
  const [to, setTo] = useState("");

  const transfer = async () => {
    await axios.post("http://localhost:5000/transfer", { amount, to });
    alert("Transfer succeeded!");
  };

  return (
    <div className="container">
      <h1>
        💰 Bank Account: <span className="balance">$5000</span>
      </h1>

      <div className="input-group">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <input
          placeholder="Recipient"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>

      <button onClick={transfer} className="btn">
        Transfer Money
      </button>

      {/* Fake Ad */}
      <div
        className="fake-ad"
        onClick={() => (window.location.href = "/fake-ad")}
      >
        <h3>🎉 Win a Free iPhone! Click Here! 🎉</h3>
      </div>
    </div>
  );
}

export default App;
