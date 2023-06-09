import React, { useState, useEffect } from 'react';
import AccountField from "./accountField.js"


function AccountFields()
{
        // informazioni comuni 

        const [_id,setId] = useState("");
        const [email,setEmail] = useState("");
        const [password,setPassword] = useState("");
        const [telefono,setTelefono] = useState("");

        // in caso di persona 
        
        const [nome,setNome] = useState("");
        const [cognome,setCognome] = useState("");
        const [dataNascita, setDataNascita] = useState("");
        
        const [eventiPubblicati,setEventiPubblicati] = useState("");
        const [prenotazioni, setPrenotazioni] = useState("");
        const [annunciPubblicati, setAnnunciPubblicati] = useState("");

        // in caso di attivita

        const [nomeAttivita,setNomeAttivita] = useState("");
        const [indirizzo,setIndirizzo] = useState("");
        const [iban,setIban] = useState("");




        function handleSubmit(e) // funzione che si occupa di prendere i dati dal form e metterli in un json
        {
            
            e.preventDefault();
            const form = e.target;

            const formData = new FormData(form);
            const formJson = Object.fromEntries(formData.entries());

            console.log(formJson);

            
            // You can pass formData as a fetch body directly:

            fetch(`http://localhost:3000/api/persona/${_id}`, {
                
                    method: 'PUT',
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: formJson
                });  
        }


        //console.log("TESTCHECK");


        useEffect (()=>{

            //console.log("accountFields.js test");

            try {
                
                const componentsToRender = [];


                const id = "6471fccf2ff11c3b27c3e243";
                fetch(`http://localhost:3000/api/persona/${id}`)
                .then((response)=>{
                    const data = response.json();
                    console.log(data);
                    return data;
                })
                .then((data)=>{
                //console.log(Object.keys(data));
                setId(data._id);
                setTelefono(data.telefono);
                setPassword(data.password);
                setEmail(data.email);

                if(data.ruolo == "attivita")
                {   
                    setNomeAttivita(data.nomeAttivita);
                    setIndirizzo(data.indirizzo);
                    setIban(data.iban);

                    componentsToRender.push(<AccountField field="nomeAttivita" value={data.nomeAttivita}/>);
                    componentsToRender.push(<AccountField field="indirizzo" value={data.indirizzo}/>);
                    componentsToRender.push(<AccountField field="iban" value={data.iban}/>);
                    
                    console.log()
                }
                else if (data.ruolo == "persona")
                {
                    setNome(data.nome);
                    setCognome(data.cognome);
                    setDataNascita(data.dataNascita);

                    
                    componentsToRender.push(<AccountField field="nome" value={data.nome}/>);
                    componentsToRender.push(<AccountField field="cognome" value={data.cognome}/>);
                    componentsToRender.push(<AccountField field="data di nascita" value={data.dataNascita}/>);
                    
                }

                console.log("uscit");
                console.log(componentsToRender);
               
                })

        }catch(error)
        {
            console.log("ciao ho avuto un errore");
        }

        //<AccountField field="name" value = {}/> aggiungibile per modularizzare

    }
)
    

    return(
        <div style={{textAlign: "center"}}>
            <p>
                Premendo sul campo desiderato si potrà modificarne il contenuto.<br/>
                Al termine delle modifiche premere il bottone "SAVE" per confermare le modifiche e renderle permanenti.
            </p>
            
            
            

            <form method="post" onSubmit={handleSubmit}>

                <label>
                    NOME
                    <input type="text" name="nome" defaultValue={nome}/>
                </label><br/>

                <label>
                    COGNOME
                    <input type="text" name="cognome" defaultValue={cognome}/>
                </label><br/>

                <label>
                    EMAIL
                    <input  type="text" name="email" defaultValue={email}/>
                </label><br/>

                <label>
                    TELEFONO
                    <input  type="text"  name="telefono" defaultValue={telefono}/>
                </label><br/>

                <label>
                    PASSWORD
                    <input  type="text"  name="password" defaultValue={password}/>
                </label><br/>

                <label>
                    DATA DI NASCITA
                    <input  type="text" name="dataNascita" defaultValue={dataNascita}/>
                </label><br/>

                <button type="submit">SAVE</button>
            </form>

           </div>
    )
}




export default AccountFields;