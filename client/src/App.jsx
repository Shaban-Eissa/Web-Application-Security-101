import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [status, setStatus] = useState("");
  const [requestCount, setRequestCount] = useState(100);
  const [isAttacking, setIsAttacking] = useState(false);

  const floodServer = async () => {
    setIsAttacking(true);
    setStatus("Initiating DDoS simulation...");

    const requests = Array.from({ length: requestCount }, () =>
      fetch("http://localhost:5000/api/data")
        .then((response) => {
          if (response.status === 429) {
            return "rate-limited";
          }
          return "success";
        })
        .catch(() => "failed")
    );

    const results = await Promise.all(requests);
    const failedCount = results.filter(r => r === "failed").length;
    const limitedCount = results.filter(r => r === "rate-limited").length;

    if (failedCount > 50) {
      setStatus("Server overwhelmed! Most requests failed to reach the target.");
    } else if (limitedCount > 50) {
      setStatus("Rate limiting detected! Server is protecting against the attack.");
    } else {
      setStatus("Server withstood the attack. Try increasing the request count.");
    }
    setIsAttacking(false);
  };

  return (
    <div className="container">
      <div className="content-box">
        <div className="heading-container">
          <h1>🛡️ DDoS Attack Simulation 🚫</h1>
          <p className="subtitle">
            Demonstrate how servers handle distributed denial-of-service attacks
          </p>
        </div>

        <div className="control-panel">
          <div className="slider-container">
            <label htmlFor="requestCount">Request Count: {requestCount}</label>
            <input
              type="range"
              id="requestCount"
              min="50"
              max="500"
              step="50"
              value={requestCount}
              onChange={(e) => setRequestCount(Number(e.target.value))}
            />
          </div>

          <button 
            onClick={floodServer} 
            className={`button ${isAttacking ? 'attacking' : ''}`}
            disabled={isAttacking}
          >
            {isAttacking ? 'Attacking...' : 'Launch Attack'}
          </button>
        </div>

        {status && (
          <div className="info-box">
            <h3 className="info-title">Attack Status</h3>
            <p className="info-text">{status}</p>
            <div className="info-details">
              <p className="info-subtext">
                This demo simulates a DDoS attack by sending multiple concurrent requests.
                The server may:
              </p>
              <ul className="info-list">
                <li>Become overwhelmed and fail</li>
                <li>Implement rate limiting</li>
                <li>Handle the load successfully</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
