import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [status, setStatus] = useState("");

  const floodServer = () => {
    // Fire 100 requests at the same time
    const requests = Array.from({ length: 100 }, () =>
      fetch("http://localhost:5000/api/data")
        .then((response) => {
          if (response.status === 429) {
            setStatus("Too many requests, please try again later.");
          }
        })
        .catch((err) => {
          console.error("Server overwhelmed:", err);
          setStatus("Server is down or unreachable.");
        })
    );

    // Wait for all requests to finish
    Promise.all(requests);
  };

  return (
    <div className="container">
      <div className="content-box">
        <div className="heading-container">
          <h1>💥 DDoS Demo 💥</h1>
          <p className="subtitle">
            Simulate a DDoS attack by firing multiple requests at the server.
          </p>
        </div>

        {status ? (
          <div className="info-box">
            <p className="info-text">{status}</p>
            {status === "Server is down or unreachable." && (
              <p className="info-subtext">
                The server is overwhelmed with requests and cannot respond.
              </p>
            )}
          </div>
        ) : (
          <>
            <button onClick={floodServer} className="button">
              Simulate Attack
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
