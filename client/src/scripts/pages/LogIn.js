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
      Cookies.set('token', data.token, {
        expires: 1, // Set the expiration of the cookie to 7 days
        path: '/', // Cookie accessible from all paths on the domain
      });
      Cookies.set('email', data.email, {
        expires: 1,
        path: '/',
      });
      Cookies.set('ruolo', data.ruolo, {
        expires: 1,
        path: '/',
      });
      Cookies.set('id', data.id, {
        expires: 1,
        path: '/',
      });
      window.location.href = '/'
      alert('cookie settati:\n' + Cookies.get('token') + '\n' + Cookies.get('email') + '\n' + Cookies.get('ruolo') + '\n' + Cookies.get('id'))
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