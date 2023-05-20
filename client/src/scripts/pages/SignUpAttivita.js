import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';

function SignUpAttivita() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nomeAttivita, setNomeAttivita] = useState('')
  const [indirizzo, setIndirizzo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [partitaIVA, setPartitaIVA] = useState('')
  const [iban, setIban] = useState('')

  async function register(event){
    event.preventDefault()
    const response = await fetch('http://localhost:5000/api/attivita/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, password, nomeAttivita, indirizzo, telefono, partitaIVA, iban, 
      })
    })

    const data = await response.json()
    console.log(data)
  }

  return (
    <div>
      <h1>Sign up Attività</h1>
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
          placeholder = "nomeAttivita"
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
          onChange={ (e) => setPartitaIVA(e.target.value)}
          type = "text"
          placeholder = "partitaIVA"
        />
        <br />
        <input
          value = { iban }
          onChange={ (e) => setIban(e.target.value)}
          type = "text"
          placeholder = "iban"
        />
        <br />
        <input type = "submit" value = "registrati" />
      </form>
      <br/><br/>
      <h4>Torna alla registrazione utente</h4>
      <button type='button' onClick={() => {navigate("/signup")}}> registra persona </button>
    </div>
  );
}

export default SignUpAttivita;