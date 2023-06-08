import React from 'react';
import { Link } from "react-router-dom";

function Logo() {
  return (
    <div id="logo">
      <Link to='/'> <img src={require("./logo.png")} alt="logo" height="100%" width="auto" /> </Link>
    </div>
  );
}

export default Logo;