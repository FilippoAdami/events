import React, { useState, useEffect } from "react";
import axios from "axios";
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
}

function DeleteAnnuncio(id){
  axios
    .delete(`http://localhost:5000/api/annunci/${id}`)
    .then((response) => {
      console.log(response);
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
}

function AddAnnuncio() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      id: 1,
      id_publisher: 1,
      title: title,
      description: description,
      time: 1,
      place: place,
      contact: contact
    };
    axios
      .post("http://localhost:5000/api/annunci", data)
      .then((response) => {
        console.log(response);
        setTitle("");
        setDescription("");
        setPlace("");
        setContact("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <br />
        <label>
          Place:
          <input
            type="text"
            value={place}
            onChange={(event) => setPlace(event.target.value)}
          />
        </label>
        <label>
          Contact:
          <input
            type="text"
            value={contact}
            onChange={(event) => setContact(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

function AnnunciList() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/annunci").then((response) => {
      setAds(response.data);
    });
  }, []);

  return (
    <div>
      {ads.map((ad) => (
        <Annuncio
          key={ad._id}
          id={ad._id}
          id_publisher={ad.id_publisher}
          title={ad.title}
          description={ad.description}
          date={new Date(ad.date)}
          time={ad.time}
          place={ad.place}
          contact={ad.contact}
        />
      ))}
    </div>
  );
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
      .patch(`http://localhost:5000/api/annunci/${id}`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={modifyA} id="editAForm" className="editA">
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
            type="text"
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

      <button type="submit" id="bottom-right" className="editA">Modify Ad</button>
    </form>
  );
};

function fetchAnnunci() {
  const response = axios.get('http://localhost:5000/api/annunci');
  return response.data;
}

export {AddAnnuncio, ModifyAnnuncio, AnnunciList, DeleteAnnuncio};
export default Annuncio; 