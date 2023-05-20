import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home.js';
import Profile from './pages/Profile.js';
import Datas from './pages/Datas.js';
import LogInPersona from './pages/LogInPersona.js';
import LogInAttivita from './pages/LogInAttivita.js';
import SignUpPersona from './pages/SignUpPersona.js';
import ResPubbHome from './pages/ResPubbHome.js';
import SignUpAttivita from './pages/SignUpAttivita.js';


function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<LogInPersona/>} />
        <Route path="/login/attivita" element={<LogInAttivita/>} />
        <Route path="/signup" element={<SignUpPersona/>} />
        <Route path="/datas" element={<Datas/>} />
        <Route path="/respubbhome" element={<ResPubbHome/>} />
        <Route path='/signup/attivita' element={<SignUpAttivita/>}/>
      </Routes>
      </div>
    </Router>
  );
}

export default App;