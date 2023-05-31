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
        //alert("errore login")
        console.log("login fallito")
      } else {
        localStorage.setItem("token", response.data.token)
        //alert("login effettuato")
        console.log("login corretto")
      }
    })
  }

  const verifica = () => {
    Axios.get("http://localhost:5000/api/verifica", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      }
    }).then((response) =>{    
      console.log(response)
    })
  }

  const logout = () => {
    Axios.get("http://localhost:5000/api/logout", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      }
    }).then((response) =>{
      localStorage.removeItem("token")
      console.log(response)
    })
  }

  const elimina = () => {
    Axios.delete("http://localhost:5000/api/elimina", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      }
    }).then((response) =>{
      if(!response.data.auth){
        //alert("utente non autenticato")
      } else {
        //alert("utente eliminato")
      }
      console.log(response)
    })
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
      <br />
        <input type = "submit" onClick={verifica} value = "verifica" />
        <br />
        <input type = "submit" onClick={elimina} value = "elimina account" />
        <br />
        <input type = "submit" onClick={logout} value = "logout" />
    </div>
  );
}

export default LogIn;