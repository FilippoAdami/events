import React from 'react';

class Evento extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      titolo: props.titolo,
      data: props.data,
      ora: props.ora,
      indirizzo: props.indirizzo,
      descrizione: props.descrizione,
      immagini: props.immagini,
      costo: props.costo,
      posti: props.posti,
      postiLiberi: props.postiLiberi,
      visibilita: props.visibilita,
      categoria: props.categoria,
      pubblicatore: props.pubblicatore,
      utentiPrenotati: props.utentiPrenotati,
      segnalato: props.segnalato,
      segnalazioni: props.segnalazioni
    };
  }

  render() {
    return (
      <div id="evento" className="inserzione" type="eventi" key={this.state.id_Evento}>
        <div>{this.state.titolo} (ID: {this.state.id_Evento})</div>
        <div>{this.state.data}</div>
        <div>{this.state.ora}</div>
        <div>{this.state.indirizzo}</div>
        <div>{this.state.descrizione}</div>
        <div>{this.state.immagini}</div>
        <div>{this.state.costo}</div>
        <div>{this.state.posti}</div>
        <div>{this.state.postiLiberi}</div>
        <div>{this.state.visibilita}</div>
        <div>{this.state.categoria}</div>
        <div>{this.state.pubblicatore}</div>
        <div>{this.state.utentiPrenotati}</div>
        <div>{this.state.segnalato}</div>
        <div>{this.state.segnalazioni}</div>
      </div>
    );
  }
}

export default Evento;