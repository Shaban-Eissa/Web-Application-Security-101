import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import FakeAd from "./FakeAd";
import "./App.css";

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
    try {
      await axios.post("http://localhost:5000/transfer", { amount, to });
      setMessage({ text: "Transfer succeeded!", type: "success" });
    } catch (error) {
      setMessage({ text: "Transfer failed!", type: "error" });
    }
  };

  return (
    <div className="container">
      <div className="content-box">
        <div className="heading-container">
          <h1>🔄 CSRF Attack Demo</h1>
          <p className="subtitle">
            Demonstrates how unauthorized actions can be performed on your behalf
          </p>
        </div>

        <div className="input-group">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount to Transfer"
            className="input"
          />
        </div>
        <div className="input-group">
          <input
            placeholder="Recipient Name"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="input"
          />
        </div>

        <button onClick={transfer} className="button">
          Transfer Money
        </button>

        <div 
          className="fake-ad-container"
          onClick={() => (window.location.href = "/fake-ad")}
        >
          <div className="fake-ad">
            <h3>🎉 Congratulations!</h3>
            <p>You've been selected to win a free iPhone! Click here!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
