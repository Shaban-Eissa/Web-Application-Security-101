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
    <div className="page-container">
      <div className="content-wrapper">
        {/* Left Section: Login Form */}
        <div className="login-container">
          <div className="heading-container">
            <h1>SQL Injection Demo</h1>
            <p className="subtitle">Shows how malicious SQL queries can be prevented</p>
          </div>
          
          <div className="input-container">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="input"
            />
          </div>
          
          <div className="input-container">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="input"
            />
          </div>
          
          <button onClick={handleLogin} className="button">
            Login
          </button>
        </div>
        {/* Right Section: Info Box */}
        <div className="info-container">
          <div className="info-box">
            <p className="info-text">
              <strong>Secure Implementation:</strong>
              <br />
              This demo uses input validation and parameterized queries to prevent SQL injection.
              <br /><br />
              <strong>Try these tests:</strong>
              <br /><br />
              1. Valid credentials:
              <br />
              <strong>Username:</strong>{" "}
              <code className="credential" onClick={() => setUsername("admin")}>
                admin
              </code>
              <br />
              <strong>Password:</strong>{" "}
              <code className="credential" onClick={() => setPassword("password123")}>
                password123
              </code>
              <br /><br />
              2. SQL Injection attempt (will be blocked):
              <br />
              <strong>Username:</strong>{" "}
              <code className="credential" onClick={() => setUsername("admin")}>
                admin
              </code>
              <br />
              <strong>Password:</strong>{" "}
              <code className="credential credential-danger" onClick={() => setPassword("' OR '1'='1")}>
                ' OR '1'='1
              </code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
