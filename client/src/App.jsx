import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Set up example cookies for demonstration
  useEffect(() => {
    document.cookie = "userID=12345; path=/";
    document.cookie = "sessionToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9; path=/";
    document.cookie = "userPreferences=theme:dark; path=/";
  }, []);

  const fetchComments = async () => {
    const response = await axios.get("http://localhost:5000/comments");
    setComments(response.data);
  };

  const escapeHTML = (str) => str.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const addComment = async () => {
    await axios.post("http://localhost:5000/comments", {
      text: escapeHTML(newComment),
    });
    setNewComment("");
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="container">
      <div className="heading-container">
        <h1>Cross-Site Scripting (XSS)</h1>
        <p className="subtitle">Shows how malicious scripts can be prevented</p>
      </div>

      <div className="input-container">
        <div className="input-label">Safe Comment Input (HTML is escaped)</div>
        <code onClick={() => setNewComment('<script>alert("XSS")</script>')}>
          {'<script>alert("XSS")</script>'}
        </code>
      </div>

      <div className="input-container">
        <input
          id="post-input"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="input"
        />
        <button onClick={addComment} className="button">
          Submit
        </button>
      </div>

      <div className="comments-section">
        {comments
          .filter((comment) => comment.text.trim() !== "")
          .map((comment, index) => (
            <div key={index} className="comment-box">
              {comment.text}
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
