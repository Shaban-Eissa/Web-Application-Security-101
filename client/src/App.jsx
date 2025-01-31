import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FakeAd from './FakeAd';
import axios from 'axios';
import { useState } from 'react';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fake-ad" element={<FakeAd />} />
      </Routes>
    </Router>
  );
}

function Home() {
  const [amount, setAmount] = useState(100);
  const [to, setTo] = useState('');

  const transfer = async () => {
    await axios.post('http://localhost:5000/transfer', { amount, to });
    alert('Transfer succeeded!');
  };

  return (
    <div>
      <h1>Bank Account: $1000</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        placeholder="Recipient"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <button onClick={transfer}>Transfer Money</button>

      {/* Fake Ad */}
      <div
        style={{
          marginTop: '20px',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={() => {
          // Redirect to a fake page
          window.location.href = 'http://localhost:5173/fake-ad';
        }}
      >
        <h3>🎉 Win a Free iPhone! Click Here! 🎉</h3>
      </div>
    </div>
  );
}

export default App;