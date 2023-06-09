import React, { useState } from 'react';

class AccountForm extends React.Component
{
    constructor(props)
    {
        super(props);
        const [nome,setNome] = useState("");
        const [cognome,setCognome] = useState("");
        const [dataNascita, setDataNascita] = useState("");
        const [email,setEmail] = useState("");
        const [password,setPassword] = useState("");
        const [telefono,setTelefono] = useState("");
        const [eventiPubblicati,setEventiPubblicati] = useState("");
        const [prenotazioni, setPrenotazioni] = useState("");
        const [annunciPubblicati, setAnnunciPubblicati] = useState("");
    }




    render()
    {
        return (
        <>
        <div id="areaPersonale">
            <div>{this.state.nome}</div>
            <div>{this.state.cognome}</div>
            <div>{this.state.email}</div>
            <div>{this.state.telefono}</div>
        </div>
        </>
        )
    }

} 


async function handleLoading()    // questa carica i dati attuali al caricamento della pagina dell'utente
{
    console.log("check 1");

    try {
    
        const id = '64720071aecb1f04e2ef4ec2';
        fetch(`http://localhost:3000/api/persona/${id}`)
        .then((response)=>{
            const data = response.json()
            console.log(data);
            
        })
        
    
    }catch(error)
    {
        console.log("ciao ho avuto un errore");
    }

}


//newData = {data : [{fieldName : field, newValue : value},{fieldName : field, newValue : value},{fieldName : field, newValue : value}]}

async function handleClick(newData) // questa cambia i dati
{

    

    try{

        const content = JSON.parse(newData);
        
        const bodyContent = JSON.stringify(content.data);
        console.log(bodyContent);

        const response = await fetch(url, {
            method: "POST",
            headers : 
            { "Content-Type": "application/json"},
            body : bodyContent
        });

        const result = await response.json();
        console.log("Success:", result);


        switch (newData.fieldName)
        {
            case "nome":
                setNome(newData.value);
                break;
                
            case "cognome":
                setCognome(newData.value);
                break;
                
            case "email":
                setEmail(newData.value);
                break;
                
            case "password":
                setPassword(newData.value);
                break;
                
            case "telefono":
                setTelefono(newData.value);
                break;
        }


    }catch(err){
        console.log(err);
    }
}

export {handleLoading};
export default AccountForm;