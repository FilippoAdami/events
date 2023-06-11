import React, { useState, useEffect} from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie'; 


function ModificaAccount() {

    const ruolo = Cookies.get('ruolo');
    const token = Cookies.get('token');
    const id = Cookies.get('id')

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

    const [user, setUser] = useState('');

    useEffect(() => {
      if(ruolo === "persona"){
        const fetchUser = async () => {
          try {
            const response = await Axios.get(`https://events-tcqp.onrender.com/api/persona/${id}`);
            setUser(response.data);
          } catch (error) {
            console.log(error);
          }
        };

        fetchUser();
      } else if( ruolo === "attivita"){
        const fetchUser = async () => {
          try {
            const response = await Axios.get(`https://events-tcqp.onrender.com/api/attivita/${id}`);
            setUser(response.data);
          } catch (error) {
            console.log(error);
          }
        };

        fetchUser();
      } else {
        console.log("errore")
      }


      return () => {
        setUser(null);
      };
    }, []);
    
    const logout = () => {
      Axios.get("https://events-tcqp.onrender.com/api/logout", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        }
      }).then((response) =>{
        localStorage.removeItem("token")
        console.log(response)
  
        Cookies.remove('token')
        Cookies.remove('email');
        Cookies.remove('ruolo');
        Cookies.remove('id');
        
        window.location.href = '/'
      })
    }

    const elimina = () => {
      Axios.delete("https://events-tcqp.onrender.com/api/elimina", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        }
      }).then((response) =>{
        console.log(response)
  
        Cookies.remove('token')
        Cookies.remove('email');
        Cookies.remove('ruolo');
        Cookies.remove('id');
  
        window.location.href = '/'
      })
  
    }

    const modificaPersona = (event) => {
        event.preventDefault()

        const data = {}; 
        
        if (email) {
          data.email = email;
        }
        if (password) {
          data.password = password;
        }
        if (nome) {
          data.nome = nome;
        }
        if (cognome) {
          data.cognome = cognome;
        }
        if (telefono) {
          data.telefono = telefono;
        }
        if (dataNascita) {
          data.dataNascita = dataNascita;
        }

        Axios.patch("https://events-tcqp.onrender.com/api/persona", {
            data, 
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

            Cookies.remove('token');
            Cookies.set('token', newToken, {
                expires: 1,
                path: '/',
            });

            Cookies.remove('email');
            Cookies.set('email', nuovoUtente.email, {
                expires: 1,
                path: '/',
            });

            console.log("Dati modificati e token aggiornato con successo");
            alert("dati modificati")
            window.location.reload();
        }
        })
    }

    

    const modificaAttivita = (event) => {
        event.preventDefault()

        const data = {}; 

        if (email) {
          data.email = email;
        }
        if (password) {
          data.password = password;
        }
        if (nomeAttivita) {
          data.nomeAttivita = nomeAttivita;
        }
        if (telefono) {
          data.telefono = telefono;
        }
        if (indirizzo) {
          data.indirizzo = indirizzo;
        }
        if (partitaIVA) {
          data.partitaIVA = partitaIVA;
        }
        if (iban) {
          data.iban = iban;
        }

        Axios.patch("https://events-tcqp.onrender.com/api/attivita", {
            data,
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

            Cookies.remove('token');
            Cookies.set('token', newToken, {
                expires: 1,
                path: '/',
            });

            Cookies.remove('email');
            Cookies.set('email', nuovoUtente.email, {
                expires: 1,
                path: '/',
            });

            console.log("Dati modificati e token aggiornato con successo");
            //alert("dati modificati")
            window.location.reload();
        }
        })
    }
    
    
    if(ruolo === "persona"){
        return(
            <div>
            <h1>Area personale di {user.email}</h1>
            <h3>I miei dati</h3>
            <p>
              Email: {user.email} <br />
              Nome: {user.nome} <br />
              Cognome: {user.cognome} <br />
              Telefono: {user.telefono} <br />
              Data di nascita: {user.dataNascita}
            </p>
            <h3>Modifica i tuoi dati</h3>
            <p>inserisci il nuovo dato e clicca su modifica</p>
            <form onSubmit = {modificaPersona}>
                <input
                value = { email }
                onChange={ (e) => setEmail(e.target.value)}
                type = "email"
                placeholder = "email"
                /> <br />
                <input
                value = { password }
                onChange={ (e) => setPassword(e.target.value)}
                type = "password"
                placeholder = "password"
                /> <br />
                <input
                value = { nome }
                onChange={ (e) => setNome(e.target.value)}
                type = "text"
                placeholder = "nome"
                /> <br />
                <input
                value = { cognome }
                onChange={ (e) => setCognome(e.target.value)}
                type = "text"
                placeholder = "cognome"
                /> <br />
                <input
                value = { telefono }
                onChange={ (e) => setTelefono(e.target.value)}
                type = "text"
                placeholder = "telefono"
                /> <br />
                <input
                value = { dataNascita }
                onChange={ (e) => setDataNascita(e.target.value)}
                type = "date"
                placeholder = "data di nascita"
                /> <br />
                <input type = "submit" value = "modifica" />
            </form>
            <br />
            <input type = "submit" onClick={elimina} value = "elimina account" />
            <br />
            <input type = "submit" onClick={logout} value = "logout" />
          </div>
        )
      } else if (ruolo === "attivita"){
        return (
            <div>
            <h1>Area personale di {user.email}</h1>
            <h3>I miei dati</h3>
            <p>
              Email: {user.email} <br />
              Nome Attività: {user.nomeAttivita} <br />
              Telefono: {user.telefono} <br />
              Indirizzo: {user.indirizzo} <br />
              Partita Iva: {user.partitaIVA} <br />
              Iban: {user.iban} 
            </p>
            <h3>Modifica i tuoi dati</h3>
            <p>inserisci il nuovo dato e clicca su modifica</p>
            <form onSubmit = {modificaAttivita}>
                <input
                value = { email }
                onChange={ (e) => setEmail(e.target.value)}
                type = "email"
                placeholder = "email"
                /> <br />
                <input
                value = { password }
                onChange={ (e) => setPassword(e.target.value)}
                type = "password"
                placeholder = "password"
                /> <br />
                <input
                value = { nomeAttivita }
                onChange={ (e) => setNomeAttivita(e.target.value)}
                type = "text"
                placeholder = "nome attivita"
                /> <br />
                <input
                value = { telefono }
                onChange={ (e) => setTelefono(e.target.value)}
                type = "text"
                placeholder = "telefono"
                /> <br />
                <input
                value = { indirizzo }
                onChange={ (e) => setIndirizzo(e.target.value)}
                type = "text"
                placeholder = "indirizzo"
                /> <br />
                <input
                value = { partitaIVA }
                onChange={ (e) => setPartitaIVA(e.target.value)}
                type = "text"
                placeholder = "partita iva"
                /> <br />
                <input
                value = { iban }
                onChange={ (e) => setIban(e.target.value)}
                type = "text"
                placeholder = "iban"
                /> <br />
                <input type = "submit" value = "modifica" />
            </form>
            <br />
            <input type = "submit" onClick={elimina} value = "elimina account" />
            <br />
            <input type = "submit" onClick={logout} value = "logout" />
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