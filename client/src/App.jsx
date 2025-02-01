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
      <h1>Login</h1>
      <div className="input-container">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
      </div>
      <div className="input-container">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default App;
