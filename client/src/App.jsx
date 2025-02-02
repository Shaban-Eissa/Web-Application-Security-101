import React, { useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      // Store the JWT token
      const token = response.data.token;
      localStorage.setItem("authToken", token);

      setMessage("🔓 Login successful");
    } catch (error) {
      setMessage("❌ Login failed");
    }
  };

  return (
    <div className="container">
      <div className="content-box">
        {/* Headline & Subtitle */}
        <div className="heading-container">
          <h1>🔓 Man-in-the-Middle (MITM) Attack Demo</h1>
          <p className="subtitle">
            The data will be sent to the server using HTTPS.
          </p>
        </div>

        {/* Login Form */}
        <div className="login-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleLogin} className="button">
            Login
          </button>

          {/* Message Box */}
          {message && (
            <div
              className={`info-box ${
                message.includes("failed") ? "error" : "success"
              }`}
            >
              <p className="info-text">{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
