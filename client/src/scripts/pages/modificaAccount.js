import React, { useState, } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie'; 


function ModificaAccount() {

    const ruolo = Cookies.get('ruolo');
    const token = Cookies.get('token')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nome, setNome] = useState('')
    const [cognome, setCognome] = useState('')
    const [telefono, setTelefono] = useState('')
    const [dataNascita, setDataNascita] = useState('')
    const [nomeAttivita, setNomeAttivita] = useState('')
    const [indirizzo, setIndirizzo] = useState('')
    const [partitaIVA, setPartitaIVA] = useState('')
    const [iban, setIban] = useState('')
    

    const modificaEmailPersona = (event) => {
        event.preventDefault()
        Axios.patch("http://localhost:5000/api/persona/email", {
            email,
        }, {
          headers: {
            "x-access-token": token,
          },
        }).then((response) => {
          if(!response.data.auth){
            console.log(response.data.message)
            alert("errore modifica")
          } else {
            const newToken = response.data.newToken;
            const nuovoUtente = response.data.nuovoUtente;

            localStorage.setItem("token", newToken);

            Cookies.remove('email');
            Cookies.set('email', nuovoUtente.email, {
                expires: 1,
                path: '/',
            });

            Cookies.remove('token');
            Cookies.set('token', newToken, {
                expires: 1,
                path: '/',
            });
            

            console.log("Email modificata e token aggiornato con successo");
            alert("email modificata")
            window.location.href = '/ModificaAccount'
        }
        })
    }

    const modificaPasswordPersona = (event) => {
        event.preventDefault()
        Axios.patch("http://localhost:5000/api/persona/password", {
            password,
        }, {
          headers: {
            "x-access-token": token,
          },
        }).then((response) => {
          if(!response.data.auth){
            console.log(response.data.message)
            alert("errore modifica")
          } else {
            const newToken = response.data.newToken;
            const nuovoUtente = response.data.nuovoUtente;

            localStorage.setItem("token", newToken);

            Cookies.remove('password');
            Cookies.set('password', nuovoUtente.password, {
                expires: 1,
                path: '/',
            });

            Cookies.remove('token');
            Cookies.set('token', newToken, {
                expires: 1,
                path: '/',
            });

            console.log("Password modificata e token aggiornato con successo");
            alert("password modificata")
            window.location.href = '/ModificaAccount'
        }
        })
    } 

    const modificaTelefonoPersona = (event) => {
        event.preventDefault()
        Axios.patch("http://localhost:5000/api/persona/telefono", {
            telefono,
        }, {
          headers: {
            "x-access-token": token,
          },
        }).then((response) => {
          if(!response.data.auth){
            console.log(response.data.message)
            alert("errore modifica")
          } else {
            const newToken = response.data.newToken;
            const nuovoUtente = response.data.nuovoUtente;

            localStorage.setItem("token", newToken);

            Cookies.remove('telefono');
            Cookies.set('telefono', nuovoUtente.telefono, {
                expires: 1,
                path: '/',
            });

            Cookies.remove('token');
            Cookies.set('token', newToken, {
                expires: 1,
                path: '/',
            });

            console.log("Telefono modificato e token aggiornato con successo");
            alert("telefono modificato")
            window.location.href = '/ModificaAccount'
        }
        })
    } 

    const modificaNome = (event) => {
        event.preventDefault()
        Axios.patch("http://localhost:5000/api/persona/nome", {
            nome,
        }, {
          headers: {
            "x-access-token": token,
          },
        }).then((response) => {
          if(!response.data.auth){
            console.log(response.data.message)
            alert("errore modifica")
          } else {
            const newToken = response.data.newToken;
            const nuovoUtente = response.data.nuovoUtente;

            localStorage.setItem("token", newToken);

            Cookies.remove('nome');
            Cookies.set('nome', nuovoUtente.nome, {
                expires: 1,
                path: '/',
            });

            Cookies.remove('token');
            Cookies.set('token', newToken, {
                expires: 1,
                path: '/',
            });

            console.log("Nome modificato e token aggiornato con successo");
            alert("nome modificato")
            window.location.href = '/ModificaAccount'
        }
        })
    } 

    const modificaCognome = (event) => {
        event.preventDefault()
        Axios.patch("http://localhost:5000/api/persona/cognome", {
            cognome,
        }, {
          headers: {
            "x-access-token": token,
          },
        }).then((response) => {
          if(!response.data.auth){
            console.log(response.data.message)
            alert("errore modifica")
          } else {
            const newToken = response.data.newToken;
            const nuovoUtente = response.data.nuovoUtente;

            localStorage.setItem("token", newToken);

            Cookies.remove('cognome');
            Cookies.set('cognome', nuovoUtente.cognome, {
                expires: 1,
                path: '/',
            });

            Cookies.remove('token');
            Cookies.set('token', newToken, {
                expires: 1,
                path: '/',
            });

            console.log("Cognome modificato e token aggiornato con successo");
            alert("cognome modificato")
            window.location.href = '/ModificaAccount'
        }
        })
    } 

    const modificaDataNascita = (event) => {
        event.preventDefault()
        Axios.patch("http://localhost:5000/api/persona/dataNascita", {
            dataNascita,
        }, {
          headers: {
            "x-access-token": token,
          },
        }).then((response) => {
          if(!response.data.auth){
            console.log(response.data.message)
            alert("errore modifica")
          } else {
            const newToken = response.data.newToken;
            const nuovoUtente = response.data.nuovoUtente;

            localStorage.setItem("token", newToken);

            Cookies.remove('dataNascita');
            Cookies.set('dataNascita', nuovoUtente.dataNascita, {
                expires: 1,
                path: '/',
            });

            Cookies.remove('token');
            Cookies.set('token', newToken, {
                expires: 1,
                path: '/',
            });

            console.log("Data di nascita modificata e token aggiornato con successo");
            alert("data di nascita modificata")
            window.location.href = '/ModificaAccount'
        }
        })
    } 

    const modificaEmailAttivita = (event) => {
        event.preventDefault()
        Axios.patch("http://localhost:5000/api/attivita/email", {
            email,
        }, {
          headers: {
            "x-access-token": token,
          },
        }).then((response) => {
          if(!response.data.auth){
            console.log(response.data.message)
            alert("errore modifica")
          } else {
            const newToken = response.data.newToken;
            const nuovoUtente = response.data.nuovoUtente;

            localStorage.setItem("token", newToken);

            Cookies.remove('email');
            Cookies.set('email', nuovoUtente.email, {
                expires: 1,
                path: '/',
            });

            Cookies.remove('token');
            Cookies.set('token', newToken, {
                expires: 1,
                path: '/',
            });

            console.log("Email modificata e token aggiornato con successo");
            alert("email modificata")
            window.location.href = '/ModificaAccount'
        }
        })
    }

    const modificaPasswordAttivita = (event) => {
        event.preventDefault()
        Axios.patch("http://localhost:5000/api/attivita/password", {
            password,
        }, {
          headers: {
            "x-access-token": token,
          },
        }).then((response) => {
          if(!response.data.auth){
            console.log(response.data.message)
            alert("errore modifica")
          } else {
            const newToken = response.data.newToken;
            const nuovoUtente = response.data.nuovoUtente;

            localStorage.setItem("token", newToken);

            Cookies.remove('password');
            Cookies.set('password', nuovoUtente.password, {
                expires: 1,
                path: '/',
            });

            Cookies.remove('token');
            Cookies.set('token', newToken, {
                expires: 1,
                path: '/',
            });

            console.log("Password modificata e token aggiornato con successo");
            alert("password modificata")
            window.location.href = '/ModificaAccount'
        }
        })
    } 

    const modificaTelefonoAttivita = (event) => {
        event.preventDefault()
        Axios.patch("http://localhost:5000/api/attivita/telefono", {
            telefono,
        }, {
          headers: {
            "x-access-token": token,
          },
        }).then((response) => {
          if(!response.data.auth){
            console.log(response.data.message)
            alert("errore modifica")
          } else {
            const newToken = response.data.newToken;
            const nuovoUtente = response.data.nuovoUtente;

            localStorage.setItem("token", newToken);

            Cookies.remove('telefono');
            Cookies.set('telefono', nuovoUtente.telefono, {
                expires: 1,
                path: '/',
            });

            Cookies.remove('token');
            Cookies.set('token', newToken, {
                expires: 1,
                path: '/',
            });

            console.log("Telefono modificato e token aggiornato con successo");
            alert("telefono modificato")
            window.location.href = '/ModificaAccount'
        }
        })
    } 

    const modificaNomeAttivita = (event) => {
        event.preventDefault()
        Axios.patch("http://localhost:5000/api/attivita/nomeAttivita", {
            nomeAttivita,
        }, {
          headers: {
            "x-access-token": token,
          },
        }).then((response) => {
          if(!response.data.auth){
            console.log(response.data.message)
          } else {
            const newToken = response.data.newToken;
            const nuovoUtente = response.data.nuovoUtente;

            localStorage.setItem("token", newToken);

            Cookies.remove('nomeAttivita');
            Cookies.set('nomeAttivita', nuovoUtente.nomeAttivita, {
                expires: 1,
                path: '/',
            });

            Cookies.remove('token');
            Cookies.set('token', newToken, {
                expires: 1,
                path: '/',
            });

            console.log("Nome attivita modificata e token aggiornato con successo");
            alert("nome attività modificato")
            window.location.href = '/ModificaAccount'
        }
        })
    } 

    const modificaIndirizzo = (event) => {
        event.preventDefault()
        Axios.patch("http://localhost:5000/api/attivita/indirizzo", {
            indirizzo,
        }, {
          headers: {
            "x-access-token": token,
          },
        }).then((response) => {
          if(!response.data.auth){
            console.log(response.data.message)
            alert("errore modifica")
          } else {
            const newToken = response.data.newToken;
            const nuovoUtente = response.data.nuovoUtente;

            localStorage.setItem("token", newToken);

            Cookies.remove('indirizzo');
            Cookies.set('indirizzo', nuovoUtente.indirizzo, {
                expires: 1,
                path: '/',
            });

            Cookies.remove('token');
            Cookies.set('token', newToken, {
                expires: 1,
                path: '/',
            });

            console.log("Indirizzo modificato e token aggiornato con successo");
            alert("indirizzo modificato")
            window.location.href = '/ModificaAccount'
        }
        })
    } 

    const modificaPartitaIVA = (event) => {
        event.preventDefault()
        Axios.patch("http://localhost:5000/api/attivita/partitaIVA", {
            partitaIVA,
        }, {
          headers: {
            "x-access-token": token,
          },
        }).then((response) => {
          if(!response.data.auth){
            console.log(response.data.message)
            alert("errore modifica")
          } else {
            const newToken = response.data.newToken;
            const nuovoUtente = response.data.nuovoUtente;

            localStorage.setItem("token", newToken);

            Cookies.remove('partitaIVA');
            Cookies.set('partitaIVA', nuovoUtente.partitaIVA, {
                expires: 1,
                path: '/',
            });

            Cookies.remove('token');
            Cookies.set('token', newToken, {
                expires: 1,
                path: '/',
            });

            console.log("Partita iva modificata e token aggiornato con successo");
            alert("partita iva modificata")
            window.location.href = '/ModificaAccount'
        }
        })
    } 

    const modificaIban = (event) => {
        event.preventDefault()
        Axios.patch("http://localhost:5000/api/attivita/iban", {
            iban,
        }, {
          headers: {
            "x-access-token": token,
          },
        }).then((response) => {
          if(!response.data.auth){
            console.log(response.data.message)
            alert("errore modifica")
          } else {
            const newToken = response.data.newToken;
            const nuovoUtente = response.data.nuovoUtente;

            localStorage.setItem("token", newToken);

            Cookies.remove('iban');
            Cookies.set('iban', nuovoUtente.iban, {
                expires: 1,
                path: '/',
            });

            Cookies.remove('token');
            Cookies.set('token', newToken, {
                expires: 1,
                path: '/',
            });

            console.log("Iban modificato e token aggiornato con successo");
            alert("iban modificato")
            window.location.href = '/ModificaAccount'
        }
        })
    } 
    
    
    
    if(ruolo === "persona"){
        return(
            <div>
            <h1>Modifica dati persona</h1>
            <form onSubmit = {modificaEmailPersona}>
                <input
                value = { email }
                onChange={ (e) => setEmail(e.target.value)}
                type = "email"
                placeholder = "email"
                />
                <input type = "submit" value = "modifica" />
            </form>
            <form onSubmit = {modificaPasswordPersona}>
                <input
                value = { password }
                onChange={ (e) => setPassword(e.target.value)}
                type = "password"
                placeholder = "password"
                />
                <input type = "submit" value = "modifica" />
            </form>
            <form onSubmit = {modificaTelefonoPersona}>
                <input
                value = { telefono }
                onChange={ (e) => setTelefono(e.target.value)}
                type = "text"
                placeholder = "telefono"
                />
                <input type = "submit" value = "modifica" />
            </form>
            <form onSubmit = {modificaNome}>
                <input
                value = { nome }
                onChange={ (e) => setNome(e.target.value)}
                type = "text"
                placeholder = "nome"
                />
                <input type = "submit" value = "modifica" />
            </form>
            <form onSubmit = {modificaCognome}>
                <input
                value = { cognome }
                onChange={ (e) => setCognome(e.target.value)}
                type = "text"
                placeholder = "cognome"
                />
                <input type = "submit" value = "modifica" />
            </form>
            <form onSubmit = {modificaDataNascita}>
                <input
                value = { dataNascita }
                onChange={ (e) => setDataNascita(e.target.value)}
                type = "date"
                placeholder = "data di nascita"
                />
                <input type = "submit" value = "modifica" />
            </form>
            </div>
        )
      } else if (ruolo === "attivita"){
        return (
            <div>
            <h1>Modifica dati attivita</h1>
            <form onSubmit = {modificaEmailAttivita}>
                <input
                value = { email }
                onChange={ (e) => setEmail(e.target.value)}
                type = "email"
                placeholder = "email"
                />
                <input type = "submit" value = "modifica" />
            </form>
            <form onSubmit = {modificaPasswordAttivita}>
                <input
                value = { password }
                onChange={ (e) => setPassword(e.target.value)}
                type = "password"
                placeholder = "password"
                />
                <input type = "submit" value = "modifica" />
            </form>
            <form onSubmit = {modificaTelefonoAttivita}>
                <input
                value = { telefono }
                onChange={ (e) => setTelefono(e.target.value)}
                type = "text"
                placeholder = "telefono"
                />
                <input type = "submit" value = "modifica" />
            </form>
            <form onSubmit = {modificaNomeAttivita}>
                <input
                value = { nomeAttivita }
                onChange={ (e) => setNomeAttivita(e.target.value)}
                type = "text"
                placeholder = "nome attivita"
                />
                <input type = "submit" value = "modifica" />
            </form>
            <form onSubmit = {modificaIndirizzo}>
                <input
                value = { indirizzo }
                onChange={ (e) => setIndirizzo(e.target.value)}
                type = "text"
                placeholder = "indirizzo"
                />
                <input type = "submit" value = "modifica" />
            </form>
            <form onSubmit = {modificaPartitaIVA}>
                <input
                value = { partitaIVA }
                onChange={ (e) => setPartitaIVA(e.target.value)}
                type = "text"
                placeholder = "partita iva"
                />
                <input type = "submit" value = "modifica" />
            </form>
            <form onSubmit = {modificaIban}>
                <input
                value = { iban }
                onChange={ (e) => setIban(e.target.value)}
                type = "text"
                placeholder = "iban"
                />
                <input type = "submit" value = "modifica" />
            </form>
            </div>
        );
    } else {
        return (
            <div>
                <p>errore autenticazione!</p>
            </div>
        )
    }
}

export default ModificaAccount;