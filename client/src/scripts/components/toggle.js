import React, { useEffect, useState } from 'react';
 
const Toggle = ({onToggle, type}) => {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  //UseEffect to see wheather show e_a or p_i basing on type value
  useEffect(() => {
    if (type === 'e_a') {
      setFirst('eventi');
      setSecond('annunci');
    } else if (type === 'p_i') {
      setFirst('pubblicazioni');
      setSecond('iscrizioni');
    }
  }, [type]);

  return (
    <div id="toggle">
        <button id="first"  onClick={() => onToggle(first)} > {first}  </button>
        <button id="second" onClick={() => onToggle(second)}> {second} </button>
    </div>
  );
}

export default Toggle;