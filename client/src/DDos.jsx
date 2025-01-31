import { useState } from "react";

const DDoS = () => {
  const [message, setMessage] = useState("");

  const floodServer = async () => {
    setMessage("Attacking server...");

    let requestCount = 0;
    let tooManyRequestsReceived = false;

    for (let i = 0; i < 1000; i++) {
      try {
        const response = await fetch("http://localhost:5000/api/data");

        if (response.status === 429) {
          tooManyRequestsReceived = true;
          break; // Stop sending requests once limit is hit
        }
        requestCount++;
      } catch (error) {
        console.log("Request failed:", error);
      }
    }

    if (tooManyRequestsReceived) {
      setMessage("🚨 Server is overwhelmed! Too many requests.");
    } else {
      setMessage("✅ Server handled the load successfully.");
    }
  };

  return (
    <div>
      <h1>DDoS Demo</h1>
      <button onClick={floodServer}>Simulate Attack</button>
      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
};

export default DDoS;
