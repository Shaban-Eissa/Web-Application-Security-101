import { useState } from "react";
import axios from "axios";

function Home() {
  const [amount, setAmount] = useState(100);
  const [to, setTo] = useState("");

  const transfer = async () => {
    await axios.post("http://localhost:5000/transfer", { amount, to });
    alert("Transfer succeeded!");
  };

  return (
    <div className="container">
      {/* Headline and subtitle for CSRF Demo */}
      <div className="heading-container">
        <h1>Cross-Site Request Forgery (CSRF) Demo</h1>
        <p className="subtitle">
          Shows how unauthorized actions can be performed
        </p>
      </div>

      {/* Bank Transfer Form */}
      <div className="input-group">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
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

      <button onClick={transfer} className="button">
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

export default Home