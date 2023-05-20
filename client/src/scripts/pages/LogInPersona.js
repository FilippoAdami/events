import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';

function LogInPersona() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function login(event){
    event.preventDefault()
    const response = await fetch('http://localhost:5000/api/persona/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, password, 
      })
    })

    const data = await response.json()
    console.log(data)
  }

  return (
    <div>
      <h1>Login Persona</h1>
      <form onSubmit = {login} >
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
        <input type = "submit" value = "login" />
      </form>
      <br/><br/>
      <h4>Sei una Azienda ? Clicca qui per accedere come Attività</h4>
      <button type='button' onClick={() => {navigate("/login/attivita")}}> login attività </button>
    </div>
  );
}

export default LogInPersona;