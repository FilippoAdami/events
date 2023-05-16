import React, { useState, useEffect } from 'react';
import axios from 'axios';

function convertToBase64(file){                 //converte l'immagine passata come paramentro in Stringa
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

function PostBanners(){

  const[id_publisher, setIdP] =useState(0)
  const[title, setTitle] =useState('')
  const[descrizione, setDesc] = useState('')
  const[budget, setBudget] = useState(0)
  const[link, setLink] = useState('')
  const[show, setShow] = useState(true)
  const[image, setImage] = useState('')
  

  function handleSubmit(event) {
    event.preventDefault()
    axios.post('http://localhost:5000/api/banners', {  
      id_publisher,
      title,
      descrizione,
      budget,
      link,
      show,
      image
    })
    .then(res => console.log(res))
    .then(console.log(image))
    .catch(err=> console.log(err));
  }

  const updateId_P = (event) => { setIdP(event.target.value) }
  const updateTitle = (event) => { setTitle(event.target.value) }
  const updateDesc = (event) => { setDesc(event.target.value) }
  const updateBudget = (event) => { setBudget(event.target.value) }
  const updateLink = (event) => { setLink(event.target.value) }
  const updateImage = async (event) => { 
    const file =event.target.files[0];
    const base64 = await convertToBase64(file);
    setImage(base64)
  }

  return (
    <div>
      <h2>POST Banners</h2>
      <form onSubmit={handleSubmit}> 
        Id_P: <input type="number" onChange={updateId_P} name="id_publisher"></input><br/><br/>
        Title: <input type="text" onChange={updateTitle} name="title" ></input><br/><br/>
        Descrizione: <input type="text" onChange={updateDesc} name="descriziono"></input><br/><br/>
        Budget: <input type="number" onChange={updateBudget} name="budget"></input><br/><br/>
        Link: <input type="text" onChange={updateLink} name="link"></input><br/><br/>
        Show:<br/>
        <label>SI</label><input type="checkbox" name="show" value="true" onClick={(event) => {setShow(true)}}></input><br/>
        <label>NO</label><input type="checkbox" name="show" value="false" onClick={(event) => {setShow(false)}}></input><br/><br/>
        Imagine:<br/>
        <input type="file" name="image" accept=".jpeg, .png, .jpg" onChange={updateImage}></input><br/><br/>
        <button className='btm'> Submit</button>
      </form>
    </div>
  );

}

function GetBanners(){

  const[data, setData] = useState([])

  function handleSubmit(event){
    event.preventDefault();
    axios.get('http://localhost:5000/api/banners')
    .then(res => setData(res.data))
    .catch(err=> console.log(err));
  }

  useEffect(() => {                                   // Prima richiesta GEt appena arrivi alla pagina
    axios.get('http://localhost:5000/api/banners')
    .then(res => setData(res.data))
    .catch(err=> console.log(err));
  },[])


  // Funzioni per la parte HTML
  function retShow(b){
    if(b){return <label>Show: SI</label> }
    else{ return <label>Show: NO</label>}
  }
  

  return (
    <div>
      <h2>Banners</h2>
      <button className='btm' onClick={handleSubmit}> Get </button>
      {
        data.map((banner, chiave) => {
         
          return (

          <div key={chiave}>
            <p>ID Publicatore: {banner.id_publisher} </p>
            <p>Titolo: {banner.title}</p>
            <p>Descrizione: {banner.descrizione}</p>
            <p>Budget: {banner.budget}</p>
            <p>Link: {banner.link}</p>
            <p> { retShow(banner.show)  }</p>
            <p>Immagine: </p>
            <img src={banner.image} alt="NO IMMAGINE"/>
            
            
            <br/><br/>
          </div> 

          )
        })
      }
    </div>

  );
}

function ResPubbHome(){
  
  return (
    <div>
      <PostBanners /><GetBanners /> 
    </div>
  );
}

export default ResPubbHome;