import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const fetchComments = async () => {
    const response = await axios.get('http://localhost:5000/comments');
    setComments(response.data);
  };

  const addComment = async () => {
    await axios.post('http://localhost:5000/comments', { text: newComment });
    setNewComment('');
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div>
      <h1>Comments</h1>
      <input
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={addComment}>Submit</button>
      <div>
        {comments.map((comment) => (
          <div key={comment.id} dangerouslySetInnerHTML={{ __html: comment.text }} />
        ))}
      </div>
    </div>
  );
}

export default App;