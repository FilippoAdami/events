import React from 'react';

function Logo() {
  return (
    <div id="logo">
      <img src={require("./logo.png")} alt="logo" height="100%" width="auto" /> 
    </div>
  );
}

export default Logo;