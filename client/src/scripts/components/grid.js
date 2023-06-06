import Banner from '../subcomponents/banner.js'
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
};

const Grid = ({ selectedOption, first, second, loadMore }) => {
  const divsNumberIncrement = 12;
  const bannerFrequency = 5;
  const [firstLoad, setFirstLoad] = useState(0);
  const [loadsecond, secondLoaded] = useState(0);
  const [loadfirst, firstLoaded] = useState(0);
  const [loadBanners, bannersLoaded] = useState(0);
  const [loadAll, allLoaded] = useState(0);
  const [loadNuber, setLoadNumer] = useState(0);
  const [divs, setDivs] = useState([]);
  let loading = false;

  const [banners, setBanners] = useState([]);

  //useEffect to load the banners from the database
  useEffect(() => {
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
      }).catch((error) => {
        console.error('Error fetching banners:', error);
      }).finally(() => {
      });
  }, []);

  //useEffect to see when the first are effectively changed
  useEffect(() => {
    if(loadfirst===0) { firstLoaded(1); return; }
    allLoaded((prevLoadAll) => prevLoadAll + 1);
    //console.log('first loaded ' + loadAll);
  }, [first]);
  //useEffect to see when the second are effectively changed
  useEffect(() => {
    if(loadsecond===0) { secondLoaded(1); return; }
    allLoaded((prevLoadAll) => prevLoadAll + 1);
    //console.log('second loaded ' + loadAll);
  }, [second]);
  //useEffect to see when the banners are effectively changed
  useEffect(() => {
    if(loadBanners===0) { bannersLoaded(1); return; }
    allLoaded((prevLoadAll) => prevLoadAll + 1);
    //console.log('banners loaded ' + loadAll);
  }, [banners]);
  //useEffect to see when all the data are effectively loaded
  useEffect(() => {
    if(loadAll===3) {
      //console.log('all loaded');
      generateDivs();
      //console.log('cookie settati:\n' + Cookies.get('token') + '\n' + Cookies.get('email') + '\n' + Cookies.get('ruolo') + '\n' + Cookies.get('id'))
    }
  }, [loadAll]);

  //useEffect to see when the selectedOption changes
  useEffect(() => {
    if(firstLoad===0) {
      setFirstLoad(1);
      //console.log('first load');
      return;
    }
    setDivs([]);
    generateDivs();
    //console.log('selectedOption changed to ' + selectedOption);
  }, [selectedOption]);

  //function to handle the scroll event
  const handleScroll = () => {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement; //variables initialization
    //checks if the user has reached the bottom of the page and if the loading is not in progress
    if (clientHeight + scrollTop >= scrollHeight-5 && loading===false && clientHeight + scrollTop > window.innerHeight+10) {
      //checks if it's showing the second or the first
      //loadMore();
      //console.log('loading more divs');
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
    //console.log(selectedOption);
    if(loading) {console.log('already loading'); return;}  //checks if the loading is alresecondoy in progress
    loading = true;
    //variables initialization
    let pool = [];
    let newDivs = [];
    let increment = divsNumberIncrement;
    //checks if it's showing the second
    if(selectedOption==='annunci' || selectedOption ==='iscrizioni'){
      pool = second;
    }//checks if it's showing the first
    else if(selectedOption==='eventi' || selectedOption ==='pubblicazioni'){
      pool = first;
    }
    //for cycle that generates the divs
    for (let i = 0; i < pool.length; i++) {
      //checks if it's time for a banner to appear
      //push the banner, restart from the first if there are not enough banners
      if ((i + 1) % bannerFrequency === 0) {
        const bannerIndex = (i + 1) % banners.length;
        newDivs.push(<>{banners[bannerIndex]}</>);
      }
      newDivs.push(<>{pool[i]}</>);  //div generation 
    }
    //console.log('divs generated: \n'+JSON.stringify(newDivs[0]));
    setDivs((prevDivs) => [...prevDivs, ...newDivs]);  //divs update
    loading = false;
  };

  return (
    <div id='container'>
      {divs}
    </div>
  );
};

export default Grid;
