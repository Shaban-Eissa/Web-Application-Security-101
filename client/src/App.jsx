import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import FakeAd from "./FakeAd";
import "./App.css";
import Home from "./Home";

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

export default App;
