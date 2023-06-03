import React, {useState, useEffect} from 'react';
import axios, { all } from 'axios';
import Cookies from 'js-cookie';
import Header from '../components/header';
import Footer from '../components/footer';
import Grid from '../components/grid';
import Toggle from '../components/toggle.js';
import { BrowserRouter as Route, Link } from 'react-router-dom';

const isLoggedIn = (token) => {
  if (token) {
    return axios.get('/api/check-login', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return Promise.reject(new Error('User is not logged in')); // Return a rejected promise if the user is not logged in
  }
};

function Profile() {
  const token = Cookies.get('token');
  const id = Cookies.get('id');
  const [selectedOption, setSelectedOption] = useState('iscrizioni'); //variable that indicates whether to display events or ads
  const [pubblicazioni, setPubblicazioni] = useState([]); //variable that contains the pubblicazioni to be displayed
  const [iscrizioni, setIscrizioni] = useState([]); //variable that contains the iscrizioni to be displayed

  //useEffect to see if the user is actually logged in using the tokenChecker and axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        await isLoggedIn(token); // Check if the user is logged in
        const annunciP = await axios.get(`/api/annunci/publisher/${id}`); // Fetch the annunci pubblicati if the user is logged in
        const eventiP = await axios.get(`/api/eventi/publisher/${id}`); // Fetch the eventi pubblicati if the user is logged in
        const eventiI = await axios.get(`/api/eventi/publisher/${id}`); // Fetch the eventi pubblicati if the user is logged in

        setInserzioni(response.data);
      } catch (error) {
        console.log(error.message); // Handle the error, such as redirecting to the login page
      }
    };

    fetchData();
  }, []);

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