import React, {useState} from 'react';
import axios from 'axios';

class Evento extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      data: props.data,
      ora: props.ora,
      indirizzo: props.indirizzo,
      descrizione: props.descrizione,
      immagini: props.immagini,
      titolo: props.titolo,
      costo: props.costo,
      posti: props.posti,
      postiLiberi: props.postiLiberi,
      visibilita: props.visibilita,
      categoria: props.categoria,
      pubblicatore: props.pubblicatore,
      utentiPrenotati: props.utentiPrenotati,
      segnalato: props.segnalato,
      segnalazioni: props.segnalazioni,
      currentImageIndex: 0, // Keep track of the current image index
      mode: props.mode,
      open: false,
      showSquare: false
    };
  }

  handleEditClick = event => {
    const { target } = event;
    if (target.classList.contains("editE")){ return;}
    this.setState(prevState => ({
      showSquare: !prevState.showSquare
    }));
    console.log("showSquare: " + !this.state.showSquare);
  };

  handleOpen = event => {
    const { target } = event;
    if (target.classList.contains("evento")){ this.setState({ open: true }); return;}
    if (target.classList.contains("overlay")){ this.setState({ open: false }); return;}
  };

  handlePreviousImage = () => {
    this.setState(prevState => ({
      currentImageIndex: (prevState.currentImageIndex - 1 + prevState.immagini.length) % prevState.immagini.length
    }));
  };

  handleNextImage = () => {
    this.setState(prevState => ({
      currentImageIndex: (prevState.currentImageIndex + 1) % prevState.immagini.length
    }));
  };

  render() {
    const { titolo, data, ora, indirizzo, descrizione, immagini, costo, postiLiberi } = this.state;
    const currentImage = immagini[this.state.currentImageIndex];

    return (
      <div id="evento" className="inserzione" type="eventi" onClick={this.handleOpen} key={this.state.id_Evento}>
        {this.state.mode === "modifiable" && (<button className="edit" onClick={this.handleEditClick}></button>)}
        {this.state.showSquare && 
          (<div className="overlay" onClick={this.handleEditClick}>
            <div id='editEvento' className="editE">
            <ModifyEvento id={this.state.id} titolo={titolo} descrizione={descrizione} indirizzo={indirizzo} ora={ora} data={data} immagini={immagini} />
            </div>
          </div>)}
        <div className="immagini">
          <button onClick={this.handlePreviousImage}><b>&lt;</b>  </button> 
          <img src={currentImage} title={descrizione} alt={descrizione}/> 
          <button onClick={this.handleNextImage}><b>&gt;</b>  </button>
        </div>
        <div className='block'>
          <div className='block1'>
            <div className='titolo'>{titolo}</div>
            <div className='date' >{data}</div> 
            <div className='time'>{ora}</div>
            <div className='address'>{indirizzo}</div>
          </div>
          <div className='block2'>
            <div className='price'>{costo}€</div>
            <div className='available'>post rimanenti: {postiLiberi}</div>
          </div>
        </div>
      </div>
    );
  }
}

function convertToBase64(file){ //converte l'immagine passata come paramentro in Stringa
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

function ModifyEvento({id, titolo, descrizione, indirizzo, ora, data, immagini}) {
  const [titleS, setTitle] = useState(titolo);
  const [descriptionS, setDescription] = useState(descrizione);
  const [placeS, setPlace] = useState(indirizzo);
  const [timeS, setTime] = useState(ora);
  const [dateS, setDate] = useState(data);
  const [immaginiS, setImmagini] = useState(immagini);
  const [immagineS, setImmagine] = useState(null);

  const modifyE = (event) => {
    event.preventDefault();
    const datas = {
      titolo: titleS,
      descrizione: descriptionS,
      indirizzo: placeS,
      ora: timeS,
      data: dateS,
      immagini: immaginiS
    };
    axios
      .patch(`http://localhost:5000/api/eventi/${id}`, datas)
      .then((response) => {
        console.log(response);
      }).then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={modifyE} id="editForm" className="editE">
      <div className="row">
        <label className="top-left">
          Title:
          <input
            type="text"
            className="editE"
            placeholder={titleS}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label className="top-right">
        Place:
          <input
            type="text"
            className="editE"
            placeholder={placeS}
            onChange={(event) => setPlace(event.target.value)}
          />
        </label>
      </div>

      <label htmlFor="immagini">
      Images:
      <input
        type="file"
        id="immagini"
        name="image"
        accept=".jpeg, .png, .jpg"
        onChange={async (e) => {
          const file = e.target.files[0];
          const base64 = await convertToBase64(file);
          setImmagini(base64, '', '');
        }}
      />
      </label>

      <label>
        Description:
        <textarea
          className="editE"
          placeholder={descriptionS}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
      </label>

      <div className="row">
        <label className="right">
          Date:
          <input
            type="date"
            className="editE"
            placeholder={dateS}
            onChange={(event) => setTime(event.target.value)}
          />
        </label>
        <label className="right">
          Time:
          <input
            type="time"
            className="editE"
            placeholder={timeS}
            onChange={(event) => setTime(event.target.value)}
          />
        </label>
      </div>

      {DeleteEvento(id)}
      <button type="submit" id="bottom-right" className="editE">Modify Ad</button>
    </form>
  );
};

function DeleteEvento(id) {

  const deleteE = (event) => {
    event.preventDefault();
    axios
    .delete(`http://localhost:5000/api/eventi/${id}`)
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
  }
  return (
    <button id="deleteButton" className="delete" onClick={deleteE}>Delete</button>
  );
}

function PostEvento() { 
  const [titolo, setTitolo] = useState('');
  const [data, setData] = useState('');
  const [ora, setOra] = useState('');
  const [indirizzo, setIndirizzo] = useState('');
  const [descrizione, setDescrizione] = useState('');
  const [immagini, setImmagini] = useState(['','','']);
  const [costo, setCosto] = useState('');
  const [posti, setPosti] = useState('');
  const [visibilita, setVisibilita] = useState(true);
  const [categoria, setCategoria] = useState('socila life');
  
  const posting = (event) =>{
    event.preventDefault();
    const datas = {
      titolo: titolo,
      descrizione: descrizione,
      indirizzo: indirizzo,
      ora: ora,
      data: data,
      costo: costo,
      posti: posti,
      visibilita: visibilita,
      categoria: categoria,
      immagini: immagini
    };
    alert(JSON.stringify(datas));
    axios.post('http://localhost:5000/api/eventi', datas)
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="newInserzione">
  <form onSubmit={posting} id="formNewE">

    <div className="row">
      <div className="title">
        <label htmlFor="titolo">Titolo</label>
        <input
          type="text"
          id="titolo"
          placeholder="Titolo"
          onChange={(e) => setTitolo(e.target.value)}
        />
      </div>

      <div className="place">
        <label htmlFor="indirizzo">Indirizzo</label>
        <input
          type="text"
          id="indirizzo"
          onChange={(e) => setIndirizzo(e.target.value)}
        />
      </div>

    </div>

    <div className="row">
      <div className="date">
        <label htmlFor="data">Data</label>
        <input
          type="date"
          id="data"
          onChange={(e) => setData(e.target.value)}
        />
      </div>

      <div className="time">
        <label htmlFor="ora">Ora</label>
        <input
          type="time"
          id="ora"
          onChange={(e) => setOra(e.target.value)}
        />
      </div>
    </div>

    <div className="descrizione">
      <label htmlFor="descrizione">Descrizione</label>
      <textarea
        id="descrizione"
        onChange={(e) => setDescrizione(e.target.value)}
      />
    </div>

    <div className="row">
      <label htmlFor="immagini">Immagine1</label>
      <input
        type="file"
        id="immagini"
        name="image"
        accept=".jpeg, .png, .jpg"
        onChange={async (e) => {
          const file = e.target.files[0];
          const base64 = await convertToBase64(file);
          setImmagini(base64, '', '');
        }}
      />
    </div>

    <div className="row">
      <div className="prezzo">
        <label htmlFor="costo">Costo</label>
        <input
          type="number"
          id="costo"
          className="form-control"
          onChange={(e) => setCosto(e.target.value)}
        />
      </div>

      <div className="postiDisponibili">
        <label htmlFor="posti">Posti</label>
        <input
          type="number"
          id="posti"
          onChange={(e) => setPosti(e.target.value)}
        />
      </div>
    </div>

    <div className="row">
      <div className='visibilita'>
        <label htmlFor="visibilita">Visibilità</label>
        <input  type="checkbox" id="visibilita" defaultChecked={true}
                onChange={(e) => {setVisibilita(e.target.checked);}}
        />
      </div>

      <div id="categoria" className="dropdown">
        <label htmlFor="categoria">Categoria</label>
        <select name="categoria" onChange={(e) => setCategoria(e.target.value)}>
          <option value="social-life">Social Life</option>
          <option value="sport">Sport</option>
          <option value="studio">Studio</option>
          <option value="svago">Svago</option>
          <option value="viaggi">Viaggi</option>
          <option value="business/progetti">Business/Progetti</option>
          <option value="cultura">Cultura</option>
          <option value="arte">Arte</option>
          <option value="cinema">Cinema</option>
          <option value="filosofia">Filosofia</option>
          <option value="altro">Altro</option>
        </select>
      </div>
    </div>


    <button type="submit" className="newButton">
      Publish
    </button>
  </form>
</div>

  );
}

export {PostEvento}
export default Evento;
