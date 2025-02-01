const DDoS = () => {
  const floodServer = () => {
    // Simulate 1000 requests (for demo purposes)
    for (let i = 0; i < 1000; i++) {
      fetch("http://localhost:5000/api/data").catch((err) =>
        console.log("Server overwhelmed!")
      );
    }
  };

  return (
    <div className="ddos-container">
      <h1>DDoS Demo</h1>
      <button onClick={floodServer}>Simulate Attack</button>
    </div>
  );
};

export default DDoS;
