import { useEffect, useState } from "react";
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
  const [csrfToken, setCsrfToken] = useState("");
  const [amount, setAmount] = useState(100);
  const [to, setTo] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/csrf-token", { withCredentials: true })
      .then((res) => {
        setCsrfToken(res.data.csrfToken);
      })
      .catch((error) => {
        console.error("Failed to fetch CSRF token:", error);
      });
  }, []);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value && !isNaN(value) && value > 0) {
      setAmount(Number(value));
    } else {
      setAmount("");
    }
  };

  const transfer = async () => {
    if (!csrfToken) {
      alert("CSRF token is missing!");
      return;
    }

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
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="container">
      <div className="content-box">
        <div className="heading-container">
          <h1>🔒 CSRF Protection Demo</h1>
          <p className="subtitle">
            Shows how unauthorized actions can be prevented
          </p>
        </div>

        <div className="input-group">
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
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
