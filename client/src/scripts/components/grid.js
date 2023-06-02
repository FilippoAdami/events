import Annuncio, {annunciodAnnuncio, ModifyAnnuncio, AnnunciList, DeleteAnnuncio } from '../subcomponents/annuncio.js'
import Banner from '../subcomponents/banner.js'
import Evento from '../subcomponents/evento.js'
import React, { useState, useEffect } from 'react';
import axios, { all } from 'axios';
import Cookies from 'js-cookie';

const tipoProfilo = {
  PERSONA: 'persona',
  AZIENDA: 'azienda',
  ADMIN: 'admin'
};
const tipoAdmin = {
  SUPERUSER : 'superuser',
  MODERATORE: 'moderatore',
  RESP_PUBB: 'resp_pubb'
}


const Grid = ({ selectedOption }) => {
  const divsNumberIncrement = 8;
  const bannerFrequency = 5;
  const [firstLoad, setFirstLoad] = useState(0);
  const [loadAnnunci, annunciLoaded] = useState(0);
  const [loadEventi, eventiLoaded] = useState(0);
  const [loadBanners, bannersLoaded] = useState(0);
  const [loadAll, allLoaded] = useState(0);
  const [divs, setDivs] = useState([]);
  const [divNumber, setDivNumber] = useState(0);
  let loading = false;


  const [annunci, setAnnunci] = useState([]);
  const [eventi, setEventi] = useState([]);
  const [pubblicazioni, setPubblicazioni] = useState([]);
  const [iscrizioni, setIscrizioni] = useState([]);
  const [banners, setBanners] = useState([]);

  //useEffect to load the annunci & the eventi & the banners from the database
  useEffect(() => {
    setDivNumber(0);
    setDivs([]);
    //fetch the annunci from the database
    axios.get("http://localhost:5000/api/annunci")
      .then((response) => {
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
        setAnnunci(fetchedAnnunci);
      })
      .catch((error) => {
        console.error('Error fetching annunci:', error);
      })
      .finally(() => {
      });
    //fetch the eventi from the database
    axios.get("http://localhost:5000/api/eventi")
      .then((response) => {
        const fetchedEventi = response.data.map((evento) => (
          <Evento
            key={evento._id}
            id={evento._id}
            pubblicatore={evento.pubblicatore}
            title={evento.titolo}
            description={evento.descrizione}
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
      })
      .catch((error) => {
        console.error('Error fetching eventi:', error);
      })
      .finally(() => {
      });
    //fetch the banners from the database
    axios.get("http://localhost:5000/api/banners")
      .then((response) => {
        const fetchedBanners = response.data.map((banner) => (
          <Banner
            key={banner._id}
            id={banner._id}
            id_publisher={banner.id_publisher}
            title={banner.title}
            descrizione={banner.descrizione}
            image={banner.image}
            budget={banner.budget}
            link={banner.link}
            clicks={banner.clicks}
            views={banner.views}
            show={banner.show}
          />
        ));
        setBanners(fetchedBanners);
      })
      .catch((error) => {
        console.error('Error fetching banners:', error);
      })
      .finally(() => {
      });
  }, []);

  //useEffect to see when the annunci are effectively changed
  useEffect(() => {
    if(loadAnnunci===0) { annunciLoaded(1); return; }
    allLoaded((prevLoadAll) => prevLoadAll + 1);
    console.log('annunci loaded ' + loadAll);
    console.log(JSON.stringify(annunci[0]));
  }, [annunci]);
  //useEffect to see when the eventi are effectively changed
  useEffect(() => {
    if(loadEventi===0) { eventiLoaded(1); return; }
    allLoaded((prevLoadAll) => prevLoadAll + 1);
    console.log('eventi loaded ' + loadAll);
    console.log(JSON.stringify(eventi[0]));
  }, [eventi]);
  //useEffect to see when the banners are effectively changed
  useEffect(() => {
    if(loadBanners===0) { bannersLoaded(1); return; }
    allLoaded((prevLoadAll) => prevLoadAll + 1);
    console.log('banners loaded ' + loadAll);
    console.log(JSON.stringify(banners[0]));
  }, [banners]);
  //useEffect to see when all the data are effectively loaded
  useEffect(() => {
    if(loadAll===3) {
      console.log('all loaded');
      generateDivs();
      console.log('cookie settati:\n' + Cookies.get('token') + '\n' + Cookies.get('email') + '\n' + Cookies.get('ruolo') + '\n' + Cookies.get('id'))
    }
  }, [loadAll]);

  //useEffect to see when the selectedOption changes
  useEffect(() => {
    if(firstLoad===0) {
      setFirstLoad(1);
      //console.log('first load');
      return;
    }
    setDivNumber(0);
    //console.log('divNumber set to 0 for selectedOption change');
    setDivs([]);
    //console.log('selectedOption changed to ' + selectedOption);
  }, [selectedOption]);

  //useEffect to see when the divNumber changes
  useEffect(() => {
    if (divNumber === 0 && divs.length === 0 && firstLoad !== 0) {
      generateDivs();
    }
    //console.log('divNumber changed to ' + divNumber);
  }, [divNumber]);

  //function to handle the scroll event
  const handleScroll = () => {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement; //variables initialization
    //checks if the user has reached the bottom of the page and if the loading is not in progress
    if (clientHeight + scrollTop >= scrollHeight-5 && loading===false && clientHeight + scrollTop > window.innerHeight+10) {
      //checks if it's showing the annunci or the eventi
      generateDivs();
      //console.log('scrolling');
    }
  };
 //useEffect to ad the scroll to end of page event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  //function to generate the divs that will contain the inserzioni
  const generateDivs = () => {
    if(loading) {console.log('already loading'); return;}  //checks if the loading is alreannuncioy in progress
    loading = true;

    //variables initialization
    let pool = [];
    let newDivs = [];
    let increment = divsNumberIncrement;
    //checks if it's showing the annunci
    if(selectedOption==='annunci'){
      if(annunci.length<(divNumber+divsNumberIncrement)){increment = annunci.length-divNumber;}
        pool = annunci.slice(divNumber, divNumber+increment);
    }//checks if it's showing the eventi
    else if(selectedOption==='eventi'){
      if(eventi.length<(divNumber+divsNumberIncrement)){increment = eventi.length-divNumber;}
        pool = eventi.slice(divNumber, divNumber+increment);
    }//checks if it's showing the iscrizioni
    else if(selectedOption==='iscrizioni'){
      if(iscrizioni.length<(divNumber+divsNumberIncrement)){increment = iscrizioni.length-divNumber;}
        pool = iscrizioni.slice(divNumber, divNumber+increment);
    }//checks if it's showing the pubblicazioni
    else if(selectedOption==='pubblicazioni'){
      if(pubblicazioni.length<(divNumber+divsNumberIncrement)){increment = pubblicazioni.length-divNumber;}
        pool = pubblicazioni.slice(divNumber, divNumber+increment);
    }
    //for cycle that generates the divs
    for (let i = 0; i < increment; i++) {
      //checks if it's time for a banner to appear
      if((divNumber+i+1)%bannerFrequency === 0){
        newDivs.push( <> {banners[(divNumber+i+1)/bannerFrequency -1]} </> );
      }
      
      newDivs.push(<>{pool[i]}</>);  //div generation 
    }
    //console.log('divs generated: \n'+JSON.stringify(newDivs[0]));
    //updates the divs, the divNumber and the loading variables
    setDivs((prevDivs) => [...prevDivs, ...newDivs]);
    setDivNumber((prevDivNumber) => prevDivNumber + increment); 
    loading = false;
  };

  return (
    <div id='container'>
      {divs}
    </div>
  );
};

export default Grid;
