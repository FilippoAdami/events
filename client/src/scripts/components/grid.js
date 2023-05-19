import Annuncio, {annunciodAnnuncio, ModifyAnnuncio, AnnunciList, DeleteAnnuncio, getAnnunciArray } from '../subcomponents/annuncio.js'
import Banner from '../subcomponents/banner.js'
import Event from '../subcomponents/event.js'
import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../AppContext';
import axios from 'axios';

//file variable that contains the type of inserzioni that will be displayed
const tipoInserzioni = {
  EVENTI: 'eventi',
  ANNUNCI: 'annunci',
  MISTO: 'misto',
};

//InfiniteScroll grid component
const InfiniteScroll = () => {
  const { myGlobalVariable } = useContext(AppContext);
  const divsNumberIncrement = 32;
  const annuncioFrequency = 5;
  const [divs, setDivs] = useState([]);
  const [annunci, setAnnunci] = useState([]);
  const [eventi, setEventi] = useState([]);
  const [divNumber, setDivNumber] = useState(0);
  const [loading, setLoading] = useState(false);

//function to generate the divs that will contain the inserzioni
  const generateDivs = () => {
    if(loading) {return;}  //checks if the loading is alreannuncioy in progress
    setLoading(true);  
    //variables initialization
    let newDivs = [];
    let content = '';
    //checks the type of the inserzioni that will be displayed
    if(myGlobalVariable===tipoInserzioni.EVENTI){
      content = 'evento';
    }else if(myGlobalVariable===tipoInserzioni.ANNUNCI){
      content = 'annuncio';
    }else if(myGlobalVariable===tipoInserzioni.MISTO){
      content = 'misto';
    }

    let contentBackup = content; //backup of the content variable to restore the content after the banner
    alert("annunci: "+JSON.stringify(annunci[0]));
    //for cicly that generates the divs
    for (let i = 0; i < divsNumberIncrement; i++) {
      //checks if it's time for a banner to appear
      let type = (divNumber+i+1)%annuncioFrequency;
      if(type===0) { content = 'banner'; }
      else if (type!==0 && content === 'banner'){content = contentBackup;}
      //div generation
      newDivs.push(
        <div className="inserzione" type={content} key={divNumber + i + 1}>
          {content + ' '+ (divNumber + i + 1)} 
        </div> 
      );
    }
    setDivs((prevDivs) => [...prevDivs, ...newDivs]); //annunciods the new divs to the old ones
    setDivNumber((prevNumber) => prevNumber + divsNumberIncrement); //updates the number of divs
    setLoading(false); //stops the loading  
  };

//function to handle the scroll event
  const handleScroll = () => {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement; //variables initialization
    //checks if the user has reached the bottom of the page and if the loading is not in progress
    if (clientHeight + scrollTop >= scrollHeight-5 && loading===false) {
      generateDivs();
    }
  };

//useEffect to handle the global variable change and set the number of divs to 0, reset the divs and generate the new ones
  useEffect(() => {
    setDivNumber(0);
    let newDivs = [];
    setDivs(newDivs);
  }, [myGlobalVariable]);
  //useEffect to handle the divNumber change and perform the specific action when divNumber is 0
    useEffect(() => {
      if (divNumber === 0) {
        generateDivs();
      }
    }, [divNumber]);
//useEffect to ad the scroll to end of page event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

//returns the "inserzioni" div that contains the divs and the loading div
  return <div id="inserzioni">
            {divs} {loading && <div id='loading'>loading...</div>} 
          </div>;
};

function Grid() {
  return (
    <div id="container">
      <InfiniteScroll />
    </div>

  );
}

export default Grid;