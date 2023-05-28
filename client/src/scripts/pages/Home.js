import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Grid from '../components/grid';
import Toggle from '../components/toggle.js';

function Home() {

  const [selectedOption, setSelectedOption] = useState('annunci'); //variable that indicates whether to display events or ads

  const handleToggle = (option) => {
    //check if the option is already selected to avoid useless re-rendering
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