import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Grid from '../components/grid';
import Map from '../components/map';
import Toggle from '../components/toggle.js';

function Home() {
  const [selectedOption, setSelectedOption] = useState('annunci');

  const handleToggle = (option) => {
    //check if the option is already selected
    if (option === selectedOption) {
      return;
    }
    setSelectedOption(option);
    console.log('selectedOption toggled to ' + option);
  };


  return (
    <>
      <Header />
      <Toggle onToggle={handleToggle}/>
      <Grid selectedOption={selectedOption}/>
    </>
  );
}

export default Home;