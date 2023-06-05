import React, { useEffect, useState } from 'react';

//file variable that contains the type of inserzioni that will be displayed
const tipoInserzioni = {
  EVENTI: 'eventi',
  ANNUNCI: 'annunci',
  PUBBLICAZIONI: 'pubblicazioni',
  ISCRIZIONI: 'iscrizioni'
};

const Toggle = ({onToggle, type}) => {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [selectedButton, setSelectedButton] = useState('');

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    onToggle(button);
  };

  //UseEffect to see wheather show e_a or p_i basing on type value
  useEffect(() => {
    if (type === 'e_a') {
      setFirst(tipoInserzioni.EVENTI);
      setSecond(tipoInserzioni.ANNUNCI);
      setSelectedButton(tipoInserzioni.EVENTI); // Set the initial selected button
    } else if (type === 'p_i') {
      setFirst(tipoInserzioni.PUBBLICAZIONI);
      setSecond(tipoInserzioni.ISCRIZIONI);
      setSelectedButton(tipoInserzioni.PUBBLICAZIONI); // Set the initial selected button

    }
  }, [type]);

  return (
    <div id="toggle">
        <button id="first"  onClick={() => handleButtonClick(first)}
        style={{ fontWeight: selectedButton === first ? 'bold' : 'normal' }} > {first}  </button>
        <button id="second" onClick={() => handleButtonClick(second)}
        style={{ fontWeight: selectedButton === second ? 'bold' : 'normal' }}> {second} </button>
    </div>
  );
}

export default Toggle;