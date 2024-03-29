import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';

function SignUpPersona() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nome, setNome] = useState('')
  const [cognome, setCognome] = useState('')
  const [telefono, setTelefono] = useState('')
  const [dataNascita, setDataNascita] = useState('')

  async function register(event){
    event.preventDefault()
    const response = await fetch('https://events-tcqp.onrender.com/api/persona/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, password, nome, cognome, telefono, dataNascita,
      })
    });

    const data = await response.json()
    if(data.persona){
      alert('registrazione effettuata');
      window.location.href = '/login'
    } else {
      alert('errore registrazione')
    }
    console.log(data)
  }

  return (
    <div>
      <h1>Registrazione Persona</h1>
      <form onSubmit = {register}>
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
          value = { nome }
          onChange={ (e) => setNome(e.target.value)}
          type = "text"
          placeholder = "nome"
        />
        <br />
        <input
          value = { cognome }
          onChange={ (e) => setCognome(e.target.value)}
          type = "text"
          placeholder = "cognome"
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
          value = { dataNascita }
          onChange={ (e) => setDataNascita(e.target.value)}
          type = "date"
          placeholder = "dataNascita"
        />
        <br />
        <input type = "submit" value = "registrati" />
      </form>
      <br/><br/>
      <h4>Sei una Azienda ? Clicca qui per registrati come Attività</h4>
      <button type='button' onClick={() => {navigate("/signup/attivita")}}> registra attività </button>
    </div>
  );
}

export default SignUpPersona;