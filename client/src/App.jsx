import React, { useState } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Handle login request
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

  // Access protected route
  const accessProtected = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:5000/protected", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(response.data);
    } catch (error) {
      setMessage("Access denied or expired session");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>

      <button onClick={accessProtected}>Access Protected Resource</button>

      <div>{message}</div>
    </div>
  );
}

export default App;
