import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home.js';
import About from './components/About.js';
import Datas from './components/Datas.js';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/datas">Datas</Link></li>
            </ul>
          </nav>
        </header>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/datas" element={<Datas/>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;