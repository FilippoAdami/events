import React, { useState } from 'react';
import "../../style/pages/postEvento.scss"


function PostEvento() {

  
  const [titolo, setTitolo] = useState('');
  const [data, setData] = useState('');
  const [ora, setOra] = useState('');
  const [indirizzo, setIndirizzo] = useState('');
  const [descrizione, setDescrizione] = useState('');
  const [costo, setCosto] = useState('');
  const [posti, setPosti] = useState('');
  const [postiLiberi, setpostiLiberi] = useState(0);
  const [visibilita, setVisibilita] = useState(true);
  const [categoria, setCategoria] = useState('socila life');
  const [pubblicatore, setPubblicatore] = useState('');
  const [segnalato, setSegnalato] =useState(false);

  
  async function posting(event){
    event.preventDefault()
    const response = await fetch('http://localhost:5000/api/eventi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titolo, data, ora, indirizzo, descrizione, costo, posti, postiLiberi, visibilita, categoria, pubblicatore, segnalato
      })
    })

    const dat = await response.json()
    console.log(dat)
  }



  function prova(event){
    console.log("ciao")
    var prova = JSON.stringify({
      titolo, data, ora, indirizzo, descrizione, costo, posti, postiLiberi, visibilita, categoria, pubblicatore, segnalato   
    })
    console.log(prova);
    
  }


  return (
    <div>
        <h1>Post Evento</h1>
        <form onSubmit={posting} id="formEvento">
          <label>Titolo</label>
          <input type = "string" placeholder = "titolo" onChange={ (e) => setTitolo(e.target.value)}/>
            
          <label>Data</label>
          <input type = "date" onChange={ (e) => setData(e.target.value)} />
            
          <label>Ora</label>
          <input  type = "time" onChange={ (e) => setOra(e.target.value)} />

          <label>Indirizzo</label>
          <input  type = "string" onChange={ (e) => setIndirizzo(e.target.value)} />

          <label>Descrizione</label>
          <textarea  onChange={ (e) => setDescrizione(e.target.value)} />

          <label>Costo</label>
          <input  type = "number" onChange={ (e) => setCosto(e.target.value)} />

          <label>Posti</label>
          <input type="number" onChange={ (e) => setPosti(e.target.value)} />

          <div>
            <label>Visibilità</label>
            <input type='checkbox' defaultChecked={true} onChange={(e) => {
                  if(e.target.value === "on"){ setVisibilita(true)}
                  else { setVisibilita(false)}
                }
              } />
          </div>
          
          <label>Categoria</label>
          <div>
            <label>social life</label>
            <input type="radio" name="Radio" value={'social-life'} onChange={ (e) => setCategoria(e.target.value)} />
            <label>sport</label>
            <input type="radio" name="Radio" value={'sport'} onChange={ (e) => setCategoria(e.target.value)} />
            <label>studio</label>
            <input type="radio" name="Radio" value={'studio'} onChange={ (e) => setCategoria(e.target.value)} />
            <label>svago</label>
            <input type="radio" name="Radio" value={'svago'} onChange={ (e) => setCategoria(e.target.value)} />
            <label>viaggi</label>
            <input type="radio" name="Radio" value={'viaggi'} onChange={ (e) => setCategoria(e.target.value)} />
            <label>business/progetti</label>
            <input type="radio" name="Radio" value={'business/progetti'} onChange={ (e) => setCategoria(e.target.value)} />
            <label>cultura</label>
            <input type="radio" name="Radio" value={'cultura'} onChange={ (e) => setCategoria(e.target.value)} />
            <label>arte</label>
            <input type="radio" name="Radio" value={'arte'} onChange={ (e) => setCategoria(e.target.value)} />
            <label>cinema</label>
            <input type="radio" name="Radio" value={'cinema'} onChange={ (e) => setCategoria(e.target.value)} />
            <label>filosofia</label>
            <input type="radio" name="Radio" value={'filosofia'} onChange={ (e) => setCategoria(e.target.value)} />
            <label>altro</label>
            <input type="radio" name="Radio" value={'altro'} onChange={ (e) => setCategoria(e.target.value)} />
          </div>
            
          <label>Pubblicatore</label>
          <input type = "number" onChange={ (e) => setPubblicatore(e.target.value)} />

          <button type="submit"> post </button>

        </form>
    </div>
  );
}

export default PostEvento;