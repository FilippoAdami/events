import React from 'react';
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div id="menu">
        <Link to="/signup"><button id="registrazione">Sign Up</button></Link>
        <Link to="/login"><button id="login">Log In</button></Link>
    </div>
  );
}

export default Menu;