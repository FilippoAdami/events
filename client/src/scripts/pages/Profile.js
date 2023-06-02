import React, {useState, useEffect} from 'react';
import axios, { all } from 'axios';
import Cookies from 'js-cookie';
import Header from '../components/header';
import Footer from '../components/footer';
import Grid from '../components/grid';
import Toggle from '../components/toggle.js';
import { BrowserRouter as Route, Link } from 'react-router-dom';

const isLoggedIn = () => {
  const token = Cookies.get('token'); // Get the user's authentication token from Cookies
  const id = Cookies.get('id');
  if (!token) {
    return Promise.reject(new Error('User is not logged in')); // Return a rejected promise if the user is not logged in
  } else {
    return axios.get('http://localhost:5000/api/persona/'+id+'', { // Otherwise, send a GET request to the /api/users/me endpoint
      headers: {
        'x-access-token': token // Set the x-access-token header
      }
    });
  }
};

const isLoggedIn = () => {
  const token = Cookies.get('token'); // Get the user's authentication token from Cookies
  const id = Cookies.get('id');
  if (!token) {
    return Promise.reject(new Error('User is not logged in')); // Return a rejected promise if the user is not logged in
  } else {
    return axios.get('http://localhost:5000/api/persona/'+id+'', { // Otherwise, send a GET request to the /api/users/me endpoint
      headers: {
        'x-access-token': token // Set the x-access-token header
      }
    });
  }
};

function Profile() {
  const [selectedOption, setSelectedOption] = useState('iscrizioni'); //variable that indicates whether to display events or ads

   //useEffect to see if the user is actually logged in using the tokenChecker and axios

  

  const handleToggle = (option) => {
    //check if the option is already selected to avoid useless re-rendering
    if (option === selectedOption) {
      return;
    }
    setSelectedOption(option);
    console.log('selectedOption toggled to ' + option);
  };

  return (
    < >
      <Header />
      <Toggle onToggle={handleToggle} type='p_i'/>
      <Grid selectedOption={selectedOption} />
    </>
  );
}

export default Profile;