import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

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
      {/* Headline and Subtitle */}
      <div className="heading-container">
        <h1>Cross-Site Scripting (XSS) Demo</h1>
        <p className="subtitle">Shows how malicious scripts can be prevented</p>
      </div>

      {/* Label and Input */}
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

      {/* Comments Section */}
      <div className="comments-section">
        {comments
          .filter((comment) => comment.text.trim() !== "")
          .map((comment, index) => (
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
