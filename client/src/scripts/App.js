import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home.js';
import Profile from './pages/Profile.js';
import Datas from './pages/Datas.js';
import LogIn from './pages/LogIn.js';
import SignUp from './pages/SignUp.js';
import SignUpAttivita from './pages/SignUpAttivita.js';
import ResPubbHome from './pages/ResPubbHome.js';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/login">Log In</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/datas">Datas</Link></li>
              <li><Link to="/respubbhome">HomeRespPubb</Link></li>

            </ul>
          </nav>
        </header>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/datas" element={<Datas/>} />
        <Route path="/respubbhome" element={<ResPubbHome/>} />
        <Route path='/signup/attivita' element={<SignUpAttivita/>}/>
      </Routes>
      </div>
    </Router>
  );
}

export default App;