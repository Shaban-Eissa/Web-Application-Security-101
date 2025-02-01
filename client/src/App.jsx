import React, { useState } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      // Store the JWT token
      const token = response.data.token;
      localStorage.setItem("authToken", token);

      setMessage("Login successful");
    } catch (error) {
      setMessage("Login failed");
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
}

export default App;
