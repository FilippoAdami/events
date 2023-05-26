import React, { useState } from 'react';
import Cookies from 'js-cookie'; 


function LogIn() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function login(event){
    event.preventDefault()
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, password, 
      })
    })

    const data = await response.json()
  
    if(data.utente){
      alert('login effettuato')
      Cookies.set("token",data.token)
      window.location.href = '/'
    } else {
      alert('errore login')
    }
  }

  return (
    <div>
      <h1>Login</h1>
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
    </div>
  );
}

export default LogIn;