import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setMessage(""); // Reset message before starting login

    try {
      // Send login request to attacker server (MITM attack simulation)
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      setMessage(response.data); // Display manipulated response from attacker server
    } catch (error) {
      setMessage("Login failed!");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
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

      <div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default LoginPage;
