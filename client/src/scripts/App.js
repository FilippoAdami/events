import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home.js';
import Profile from './pages/Profile.js';
import Datas from './pages/Datas.js';
import LogIn from './pages/LogIn.js';
import SignUpPersona from './pages/SignUpPersona.js';
import ResPubbHome from './pages/ResPubbHome.js';
import SignUpAttivita from './pages/SignUpAttivita.js';
import PostEvento from './pages/postEvento.js';

import Cookies from 'js-cookie';


function App() {

  return (
    <Router>
      <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/signup" element={<SignUpPersona/>} />
        <Route path="/datas" element={<Datas/>} />
        <Route path="/respubbhome" element={<ResPubbHome/>} />
        <Route path='/signup/attivita' element={<SignUpAttivita/>}/>
        <Route path='/postEvento' element={<PostEvento/>}/>
      </Routes>
      </div>
    </Router>
  );
}

export default App;