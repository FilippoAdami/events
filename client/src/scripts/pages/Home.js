import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Grid from '../components/grid';
import Map from '../components/map';
import Toggle from '../components/toggle.js';

function Home() {
  return (
    <nobr>
      <Header />
      <Toggle />
      <Grid />
    </nobr>
  );
}

export default Home;