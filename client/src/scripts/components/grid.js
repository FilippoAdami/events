import Annuncio, {annunciodAnnuncio, ModifyAnnuncio, AnnunciList, DeleteAnnuncio } from '../subcomponents/annuncio.js'
import Banner from '../subcomponents/banner.js'
import Event from '../subcomponents/event.js'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

//file variable that contains the type of inserzioni that will be displayed
const tipoInserzioni = {
  EVENTI: 'eventi',
  ANNUNCI: 'annunci',
  MISTO: 'misto',
};

const Grid = ({ selectedOption }) => {
  const divsNumberIncrement = 32;
  const bannerFrequency = 5;
  const [firstLoad, setFirstLoad] = useState(0);
  const [loadAnnunci, annunciLoaded] = useState(0);
  const [divs, setDivs] = useState([]);
  const [divNumber, setDivNumber] = useState(0);
  let loading = false;

  const [annunci, setAnnunci] = useState([]);

  //useEffect to load the annunci from the database
  useEffect(() => {
    setDivNumber(0);
    setDivs([]);
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
  }, []);

  //useEffect to see when the annunci are effectively changed
  useEffect(() => {
    if(loadAnnunci===0) { annunciLoaded(1); return; }
    console.log('annunci loaded');
    console.log(JSON.stringify(annunci[0]));
    generateDivs();
  }, [annunci]);

  //useEffect to see when the selectedOption changes
  useEffect(() => {
    if(firstLoad===0) {
      setFirstLoad(1);
      return;
    }
    setDivNumber(0);
    setDivs([]);
    console.log('selectedOption changed to ' + selectedOption);
  }, [selectedOption]);

  //useEffect to see when the divNumber changes
  useEffect(() => {
    if (divNumber === 0 && divs.length === 0 && firstLoad !== 0) {
      generateDivs();
    }
    console.log('divNumber changed to ' + divNumber);
  }, [divNumber]);

  //function to handle the scroll event
  const handleScroll = () => {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement; //variables initialization
    //checks if the user has reached the bottom of the page and if the loading is not in progress
    if (clientHeight + scrollTop >= scrollHeight-5 && loading===false && clientHeight + scrollTop > window.innerHeight+10) {
      generateDivs();
      console.log('scrolling');
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
    let newDivs = [];
    let content = selectedOption;
    let contentBackup = content; //backup of the content variable to restore the content after the banner

    //for cycle that generates the divs
    for (let i = 0; i < divsNumberIncrement; i++) {
      //checks if it's time for a banner to appear
      let type = (divNumber+i+1)%bannerFrequency;
      if(type===0) { content = 'banner'; }
      else if (type!==0 && content === 'banner'){content = contentBackup;}


    let annuncioIndex = divNumber + i;
    let annuncioComponent = null;
    if (annuncioIndex < annunci.length) {
      annuncioComponent = annunci[annuncioIndex];
    }


      //div generation
      newDivs.push(<>{annuncioComponent}</>);
      
    }


    console.log('divs generated: \n'+JSON.stringify(newDivs[0]));
    setDivs((prevDivs) => [...prevDivs, ...newDivs]);
    setDivNumber((prevDivNumber) => prevDivNumber + divsNumberIncrement);
    loading = false;
  };

  return (
    <div id='container'>
      {selectedOption === 'annunci' && <>{divs}</>}
      {selectedOption === 'eventi' && <>{divs}</>}
    </div>
  );
};

export default Grid;
