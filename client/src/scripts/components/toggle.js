import React, { useContext } from 'react';
import AppContext from '../AppContext';
 
function Toggle() {
  const { setMyGlobalVariable } = useContext(AppContext);

  //function to show the eventi
  function showEveni(){
    setMyGlobalVariable('eventi');
  }
  //function to show the annunci
  function showAnnunci(){
    setMyGlobalVariable('annunci');
  }

  return (
    <div id="toggle">
        <button id="eventi"  onClick={showEveni}  > Eventi  </button>
        <button id="annunci" onClick={showAnnunci}> Annunci </button>
    </div>
  );
}

export default Toggle;