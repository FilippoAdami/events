import React, { useContext } from 'react';
 
const Toggle = ({onToggle}) => {
  return (
    <div id="toggle">
        <button id="eventi"  onClick={() => onToggle('eventi')} > Eventi  </button>
        <button id="annunci" onClick={() => onToggle('annunci')}> Annunci </button>
    </div>
  );
}

export default Toggle;