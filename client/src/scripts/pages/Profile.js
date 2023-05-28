import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Grid from '../components/grid';
import Toggle from '../components/toggle.js';
import { BrowserRouter as Route, Link } from 'react-router-dom';

function Profile() {

  return (
    <div>
      <h1>About the Smart-Public Showcase</h1>
      <p>
        The Smart-Public Showcase is a platform for users to upload and share their events with others.
      </p>
      <p>Welcome to your personal profile page</p>
      <Link to="/postEvento"><button> Post Evento</button></Link>
    </div>
  );
}

export default Profile;