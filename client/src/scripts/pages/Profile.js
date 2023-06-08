import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Header from '../components/header';
import Footer from '../components/footer';
import Grid from '../components/grid';
import Toggle from '../components/toggle.js';
import Link  from 'react-router-dom';
import Evento from '../subcomponents/evento.js';
import Annuncio from '../subcomponents/annuncio.js';

const isLoggedIn = async (token) => {
  if (token) {
    //console.log(token)
    var richiesta = await axios.get('http://localhost:5000/api/verifica', {
      headers: {
        "x-access-token": token,
      }
    });
    console.log(richiesta)
    return richiesta
  } else {
    return Promise.reject(new Error('User is not logged in')); // Return a rejected promise if the user is not logged in
  }
};

function Profile() {
  const token = Cookies.get('token');
  const id = Cookies.get('id');
  const ruolo = Cookies.get('ruolo');
  const [selectedOption, setSelectedOption] = useState('pubblicazioni'); //variable that indicates whether to display events or ads
  let holder;
  const [pubblicazioni, setPubblicazioni] = useState([]); //variable that contains the pubblicazioni to be displayed
  const [iscrizioni, setIscrizioni] = useState([]); //variable that contains the iscrizioni to be displayed

  //useEffect to see if the user is logged in and to fetch the pubblicazioni and iscrizioni
  useEffect(() => {
    const fetchData = async () => {
      // Check if the user is logged in
      try {
        await isLoggedIn(token); // Check if the user is logged in
        //console.log('User is logged in');
      } catch (error) {
        console.log(error.message); // Handle the error, such as redirecting to the login page
      }
      //fetch the pubblicazioni and the iscrizioni from the database
      try{
        await axios.get(`http://localhost:5000/api/annunci/publisher/${id}`, {
          headers: {
            "x-access-token": token
          }
        })
        .then((response) => {
          const fetchedAnnunci = response.data.map((annuncio) => (
            <Annuncio
              key={annuncio._id}
              mode='modifiable'
              id={annuncio._id}
              id_publisher={annuncio.id_publisher}
              title={annuncio.title}
              description={annuncio.description}
              date={annuncio.date}
              time={annuncio.time}
              place={annuncio.place}
              contact={annuncio.contact}
            />
          )); // Fetch the annunci pubblicati if the user is logged in
          holder = fetchedAnnunci;
          //console.log('Annunci pubblicati fetched in Profile: \n'+ JSON.stringify(fetchedAnnunci[0]));
        }); 

        await axios.get(`http://localhost:5000/api/eventi/publisher/${id}`, {
          headers: {
            "x-access-token": token
          }
        })
        .then((response) => {
          const fetchedEventi = response.data.map((evento) => (
            <Evento
              key={evento._id}
              mode='modifiable'
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
          ));//set the pubblicazioni to be the sum of the fetched annunci and eventi
          setPubblicazioni(fetchedEventi.concat(holder));
          //console.log('Eventi pubblicati fetched in Profile: \n'+ JSON.stringify(fetchedEventi[0]));
        });

        if (ruolo === 'persona') {
        await axios.get(`http://localhost:5000/api/eventi/utente/${id}`, {
          headers: {
            "x-access-token": token
          }
        })
        .then((response) => {
          const fetchedEventiI = response.data.map((evento) => (
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
          setIscrizioni(fetchedEventiI);
          //console.log('Eventi iscritto fetched in Profile: \n'+ JSON.stringify(fetchedEventiI[0]));
        });
      }

      } catch (error) {
        console.error(`Error fetching ${selectedOption}:`, error);
      }
    };fetchData();
  }, []);

  //function to handle the toggle between pubblicazioni and iscirizioni
  const handleToggle = (option) => {
    //check if the option is already selected to avoid useless re-rendering
    if (option === selectedOption) {
      return;
    }
    setSelectedOption(option);
    //console.log('selectedOption toggled to ' + option);
  };

  if(ruolo === 'persona'){
  return (
    < >
      <Header menu='profileMenu'/>
      <Toggle onToggle={handleToggle} type='p_i'/>
      <Grid selectedOption={selectedOption} first={pubblicazioni} second={iscrizioni} />
    </>
  );
  }else{
    return (
      < >
        <Header menu='profileMenu'/>
        <Grid selectedOption={selectedOption} first={pubblicazioni} second={iscrizioni} />
      </>
    );
  }
}


export default Profile;
