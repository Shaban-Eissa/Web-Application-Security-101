import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateInput = (username, password) => {
    const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/; // Only allow alphanumeric and underscores (3-20 chars)
    if (!usernamePattern.test(username)) {
      alert("Invalid username format.");
      return false;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInput(username, password)) return; // Stop execution if input is invalid

    const response = await axios.post("http://localhost:5000/login", {
      username,
      password,
    });
    alert(response.data);
  };

  return (
    <div className="container">
      {/* Headline and Subtitle */}
      <div className="heading-container">
        <h1>SQL Injection Demo</h1>
        <p className="subtitle">
          Shows how malicious SQL queries can be prevented
        </p>
      </div>

      {/* Username Input */}
      <div className="input-container">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="input"
        />
      </div>

      {/* Password Input */}
      <div className="input-container">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input"
        />
      </div>

      {/* Login Button */}
      <button onClick={handleLogin} className="button">
        Login
      </button>

      {/* Styled Box */}
      <div className="info-box">
        <p className="info-text">
          Usage of parameterized queries can prevent SQL injection attacks. Try
          entering the following credentials:
          <br />
          <br />
          <strong>Username:</strong> admin
          <br />
          <strong>Password:</strong> password123
        </p>
      </div>
    </div>
  );
}

export default App;
