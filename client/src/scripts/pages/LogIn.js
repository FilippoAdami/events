import React, { useState } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie'; 


function LogIn() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = (event) => {
    event.preventDefault()
    Axios.post("http://localhost:5000/api/login", {
      email, password,
    }).then((response) => {
      if(!response.data.auth) {
        alert("errore login")
        console.log("errore login")
      } else {
        localStorage.setItem("token", response.data.token)
        alert("login corretto")
        console.log("login corretto")
        
        Cookies.set('token', response.data.token, {
          expires: 1, // Set the expiration of the cookie to 7 days
          path: '/', // Cookie accessible from all paths on the domain
        });
        Cookies.set('email', response.data.utente.email, {
          expires: 1,
          path: '/',
        });
        Cookies.set('ruolo', response.data.utente.ruolo, {
          expires: 1,
          path: '/',
        });
        Cookies.set('id', response.data.utente._id, {
          expires: 1,
          path: '/',
        });
        
        console.log('cookie settati:\n' + Cookies.get('token') + '\n' + Cookies.get('email') + '\n' + Cookies.get('ruolo') + '\n' + Cookies.get('id'))
        window.location.href = '/'
      }
    })
  }

  /*
  const verifica = () => {
    Axios.get("http://localhost:5000/api/verifica", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      }
    }).then((response) =>{    
      console.log(response)
    })
  }
  */


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

        <div className='signup'>
          <a href='/signup'>Non hai un account? Registrati</a>
        </div>
        </form>
    </div>
  );
}

export default LogIn;