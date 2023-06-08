import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Header from '../components/header';
import Footer from '../components/footer';
import Grid from '../components/grid';
import Toggle from '../components/toggle.js';
import Evento from '../subcomponents/evento.js';
import Annuncio from '../subcomponents/annuncio.js';

const isLoggedIn = async (token) => {
  if (token) {
    return await axios.get('http://localhost:5000/api/check-login', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return Promise.reject(new Error('User is not logged in')); // Return a rejected promise if the user is not logged in
  }
};

function Home() {
  const [selectedOption, setSelectedOption] = useState('eventi'); //variable that indicates whether to display events or ads
  const [logged, setLogged] = useState('login'); //variable that contains the eventi
  const [eventi, setEventi] = useState([]); //variable that contains the eventi
  const [annunci, setAnnunci] = useState([]); //variable that contains the annunci
  //const [eventiN, setEventiN] = useState(0); //variable that contains the number of eventi
  //const [annunciN, setAnnunciN] = useState(0); //variable that contains the number of annunci
  //const [page, setPage] = useState(1);

  //useEffect to load the eventi & annunci from the database
  useEffect(() => {
    // Check if the user is logged in
    try {
      const token = Cookies.get('token');
      isLoggedIn(token)
      .then((response) => {
        if (response.status === 200) {
          setLogged('profile');
        }
      })
    } catch (error) {
      console.log(error.message); // Handle the error, such as redirecting to the login page
    }
    //fetch the annunci from the database
    try{
      axios.get("http://localhost:5000/api/annunci", {
        params: {
          page: 1,
          limit: 32,
        },
      }).then((response) => {
        const fetchedAnnunci = response.data.map((annuncio) => (
          <Annuncio
            key={annuncio._id}
            id={annuncio._id}
            id_publisher={annuncio.id_publisher}
            title={annuncio.title}
            description={annuncio.description}
            date={annuncio.date}
            time={annuncio.time}
            place={annuncio.place}
            contact={annuncio.contact}
          />
        ));
        //console.log(`${fetchedAnnunci.length} annunci loaded: \n${JSON.stringify(fetchedAnnunci[0])}`);
        setAnnunci(fetchedAnnunci);
    })} catch (error) {
      console.error('Error fetching annunci:', error);
    }
    //fetch the eventi from the database
    try{
    axios.get("http://localhost:5000/api/eventi", {
      params: {
        page: 1,
        limit: 32,
      }
    }).then((response) => {
        const fetchedEventi = response.data.map((evento) => (
          <Evento
            key={evento._id}
            id={evento._id}
            pubblicatore={evento.pubblicatore}
            titolo={evento.titolo}
            descrizione={evento.descrizione}
            data={evento.data}
            ora={evento.ora}
            indirizzo={evento.indirizzo}
            immagini = {evento.immagini}
            costo = {evento.costo}
            posti = {evento.posti}
            postiLiberi = {evento.postiLiberi}
            visibilita = {evento.visibilita}
            categoria = {evento.categoria}
            utentiPrenotati = {evento.utentiPrenotati}
            segnalato = {evento.segnalato}
            segnalazioni = {evento.segnalazioni}
          />
        ));
        setEventi(fetchedEventi);
        //console.log(`${fetchedEventi.length} eventi loaded: \n${JSON.stringify(fetchedEventi[0])}`);
      })} catch (error) {
        console.error('Error fetching eventi:', error);
      }
  }, []);

  //function to handle the toggle between events and ads
  const handleToggle = (option) => {
    //check if the option is already selected to avoid useless re-rendering
    if (option === selectedOption) {
      return;
    }
    setSelectedOption(option);
    //console.log('selectedOption toggled to ' + option);
  };

  return (
    <>
      <Header menu={logged}/>
      <Toggle onToggle={handleToggle} type='e_a'/>
      <Grid selectedOption={selectedOption} first={eventi} second={annunci}/>
    </>
  );
}

export default Home;