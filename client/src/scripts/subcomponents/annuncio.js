import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

class Annuncio extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      id_publisher: props.id_publisher,
      title: props.title,
      description: props.description,
      date: props.date,
      time: props.time,
      place: props.place,
      contact: props.contact,
      mode: props.mode,
      showSquare: false
    };
  }

  handleEditClick = event => {
    const { target } = event;
    if (target.classList.contains("editA")){ return;}
    this.setState(prevState => ({
      showSquare: !prevState.showSquare
    }));
  };

  render(){
    const { mode, showSquare } = this.state;
    return(
      <div id="annuncio" className="inserzione" type="annunci" key={this.state.id}>
          {mode === "modifiable" && (<button className="edit" onClick={this.handleEditClick}></button>)}
          {showSquare && 
            (<div className="overlay" onClick={this.handleEditClick}><div id='editAnnuncio' className="editA">
              <ModifyAnnuncio id={this.state.id} title={this.state.title} description={this.state.description} place={this.state.place} time={this.state.time} contact={this.state.contact}/>
            </div></div>)}
          <><div className="title">{this.state.title}</div> <div className="time">{this.state.time}</div></>
          <div className="description">{this.state.description}</div>
          <><div className="place">{this.state.place}</div> <div className="contact">{this.state.contact}</div></>    
      </div>
    );
  }
};

function ModifyAnnuncio({id, title, description, place, time, contact}) {
  const [titleS, setTitle] = useState(title);
  const [descriptionS, setDescription] = useState(description);
  const [placeS, setPlace] = useState(place);
  const [timeS, setTime] = useState(time);
  const [contactS, setContact] = useState(contact);

  const modifyA = (event) => {
    event.preventDefault();
    const data = {
      title: titleS,
      description: descriptionS,
      place: placeS,
      time: timeS,
      contact: contactS
    };
    axios
      .patch(`https://events-tcqp.onrender.com/api/annunci/${id}`, data, {
        headers: {
          "x-access-token": Cookies.get('token')
        }
      })
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
    <form onSubmit={modifyA} id="editForm" className="editA">
      <div className="row">
        <label className="top-left">
          Title:
          <input
            type="text"
            className="editA"
            placeholder={titleS}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label className="top-right">
          Time:
          <input
            type="time"
            className="editA"
            placeholder={timeS}
            onChange={(event) => setTime(event.target.value)}
          />
        </label>
      </div>

      <label>
        Description:
        <textarea
          className="editA"
          placeholder={descriptionS}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
      </label>

      <div className="row">
        <label className="left">
          Contact:
          <input
            type="text"
            className="editA"
            placeholder={contactS}
            onChange={(event) => setContact(event.target.value)}
          />
        </label>
        <label className="right">
          Place:
          <input
            type="text"
            className="editA"
            placeholder={placeS}
            onChange={(event) => setPlace(event.target.value)}
          />
        </label>
      </div>
      <div className="row">
      {DeleteAnnuncio(id)}
      <button type="submit" id="bottom-right" className="editA">Modify</button>
      </div>
    </form>
  );
};

function DeleteAnnuncio(id){

  const DeleteAnnuncio = (id) => (event) => {
    event.preventDefault();
    axios
      .delete("https://events-tcqp.onrender.com/api/annunci/" + id, {
        headers: {
          "x-access-token": Cookies.get('token')
        }
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return(
      <button className="delete" id="deleteButton" onClick={DeleteAnnuncio(id)}> Delete </button>
  );
};

function AddAnnuncio() {
  const [title, setTitle] = useState("Nuovo annuncio");
  const [description, setDescription] = useState("Descrizione del nuovo annuncio");
  const [place, setPlace] = useState("Trento");
  const [contact, setContact] = useState("@IG: mario.rossi");
  const [time, setTime] = useState("0000");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      title: title,
      description: description,
      time: time,
      place: place,
      contact: contact
    };
    axios
      .post("https://events-tcqp.onrender.com/api/annunci", data, {
        headers: {
          "x-access-token": Cookies.get('token')
        }
      })
      .then((response) => {
        //console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="newInserzione">
      <form id='formNewA' onSubmit={handleSubmit}>
        <div className="row">
          <label>
            Title:
            <input
              type="text"
              className='newAnnuncio'
              placeholder={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <label>
            Time:
            <input
              type="time"
              className='newAnnuncio'
              placeholder={time}
              onChange={(event) => setTime(event.target.value)}
            />
          </label>
        </div>
        <br />

        <label>
          Description:
          <textarea
            className='newAnnuncio'
            placeholder={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <br />

        <div className="row">
          <label>
            Place:
            <input
              type="text"
              className='newAnnuncio'
              placeholder={place}
              onChange={(event) => setPlace(event.target.value)}
            />
          </label>
          <label>
            Contact:
            <input
              type="text"
              className='newAnnuncio'
              placeholder={contact}
              onChange={(event) => setContact(event.target.value)}
            />
          </label>
        </div>
        <br />

        <button className='newButton' type="submit">Publish</button>
      </form>
    </div>
  );

};

export {AddAnnuncio};
export default Annuncio; 