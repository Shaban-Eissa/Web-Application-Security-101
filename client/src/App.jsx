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
      <h1>Comments</h1>
      <div className="input-container">
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button onClick={addComment}>Submit</button>
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
