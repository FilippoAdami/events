import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';

function SignUpAttivita () {
    
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nomeAttivita, setNomeAttivita] = useState('')
  const [indirizzo, setIndirizzo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [partitaIVA, setPerititaIVA] = useState('')
  const [IBAN, setIBAN] = useState('')

  async function register(event){
    event.preventDefault()
    const response = await fetch('http://localhost:5000/api/attivita/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, password, nomeAttivita, indirizzo, telefono, partitaIVA, IBAN
      })
    })

    const data = await response.json()
    console.log(data)
  }

  return (
    <div>
      <h1>Register Attivita</h1>
      <form onSubmit = {register} >
        <input
          value = { email }
          onChange={ (e) => setEmail(e.target.value)}
          type = "email"
          placeholder = "email"
        />
        <br />
        <input
          value = { password }
          onChange={ (e) => setPassword(e.target.value)}
          type = "password"
          placeholder = "password"
        />
        <br />
        <input
          value = { nomeAttivita }
          onChange={ (e) => setNomeAttivita(e.target.value)}
          type = "text"
          placeholder = "nome attività"
        />
        <br />
        <input
          value = { indirizzo }
          onChange={ (e) => setIndirizzo(e.target.value)}
          type = "text"
          placeholder = "indirizzo"
        />
        <br />
        <input
          value = { telefono }
          onChange={ (e) => setTelefono(e.target.value)}
          type = "text"
          placeholder = "telefono"
        />
        <br />
        <input
          value = { partitaIVA }
          onChange={ (e) => setPerititaIVA(e.target.value)}
          type = "number"
          placeholder = "partita iva"
        />
        <input
          value = { IBAN }
          onChange={ (e) => setIBAN(e.target.value)}
          type = "number"
          placeholder = "IBAN"
        />
        <br />
        <input type = "submit" value = "registrati" />
      </form>
      <br/><br/>
      <h4>Torna alla registrazione utente</h4>
      <button type='button' onClick={() => {navigate("/signup")}}> Indietro </button>
    </div>
  );
}

export default SignUpAttivita;