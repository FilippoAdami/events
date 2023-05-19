import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home.js';
import Profile from './pages/Profile.js';
import Datas from './pages/Datas.js';
import LogIn from './pages/LogIn.js';
import SignUp from './pages/SignUp.js';


function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/datas" element={<Datas/>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;