import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

import FakeAd from "./FakeAd";

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
  const [csrfToken, setCsrfToken] = useState("");
  const [amount, setAmount] = useState(100);
  const [to, setTo] = useState("");

  // Fetch CSRF token on page load if it's not in localStorage
  useEffect(() => {
    axios
      .get("http://localhost:5000/csrf-token", { withCredentials: true })
      .then((res) => {
        setCsrfToken(res.data.csrfToken);
      })
      .catch((error) => {
        console.error("Failed to fetch CSRF token:", error);
      });
  }, []); // Empty dependency array to fetch token once

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Ensure the input is a valid number
    if (value && !isNaN(value) && value > 0) {
      setAmount(Number(value));
    } else {
      setAmount(""); // Clear invalid amount
    }
  };

  const transfer = async () => {
    if (!csrfToken) {
      alert("CSRF token is missing!");
      return;
    }

    // Check if amount and recipient are valid
    if (amount <= 0 || !to) {
      alert("Invalid transfer details");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/transfer",
        { amount, to },
        {
          headers: { "X-CSRF-Token": csrfToken },
          withCredentials: true,
        }
      );
      alert("Transfer succeeded!");
    } catch (error) {
      console.error("Transfer failed:", error);
      alert("Transfer failed. CSRF protection might be blocking it.");
      // Log detailed error to help with debugging
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="container">
      <div className="heading-container">
        <h1>Cross-Site Request Forgery (CSRF) Demo</h1>
        <p className="subtitle">
          Shows how unauthorized actions can be prevented
        </p>
      </div>

      <div className="input-group">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Amount"
          className="input"
        />
        <input
          placeholder="Recipient"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="input"
        />
      </div>

      <button onClick={transfer} className="btn">
        Transfer Money
      </button>

      {/* Fake Ad */}
      <div
        className="info-box fake-ad"
        onClick={() => (window.location.href = "/fake-ad")}
      >
        <h3>🎉 Win a Free iPhone! Click Here! 🎉</h3>
      </div>
    </div>
  );
}

export default App;
