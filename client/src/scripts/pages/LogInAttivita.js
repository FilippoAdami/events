import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';

function LogInAttivita() {

  const navigate = useNavigate()  

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function login(event){
    event.preventDefault()
    const response = await fetch('http://localhost:5000/api/attivita/login', {
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
      <h1>Login Attività</h1>
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
      <h4>Torna al login persona</h4>
      <button type='button' onClick={() => {navigate("/login")}}> login persona </button>
    </div>
  );
}

export default LogInAttivita;