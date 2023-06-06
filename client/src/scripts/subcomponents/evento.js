import React from 'react';

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
      currentImageIndex: 0 // Keep track of the current image index
    };
  }

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
      <div id="evento" className="inserzione" type="eventi" key={this.state.id_Evento}>
        <div className="immagini">
          <button onClick={this.handlePreviousImage}><b>&lt;</b>  </button> 
          <img src={currentImage} alt='nessun immagine'/> 
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

export default Evento;
