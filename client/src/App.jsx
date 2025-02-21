import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
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
          Shows how malicious SQL queries can be injected
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
          Try using <code className="credential" onClick={() => setUsername("admin")}>admin</code> as the username and{" "}
          <code className="credential" onClick={() => setPassword("' OR '1'='1' --")}>
            ' OR '1'='1' --
          </code>{" "}
          as the password to bypass authentication.
        </p>
      </div>
    </div>
  );
}

export default App;
