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
    };
  }
  /*
  delete = this.deleteF.bind(this);

  deleteF(){
    axios
      .delete(`http://localhost:5000/api/annunci/${this.state.id}`)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  } */
  render(){
      return(
          <div id="annuncio" className="inserzione" type="annunci" key={this.state.id}>
              <div>{this.state.title} id {this.state.id}</div>
              <div>{this.state.description}</div>
              <div>{this.state.date}</div>
              <div>{this.state.place}</div>
              <div>{this.state.contact}</div>
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

function ModifyAnnuncio() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [contact, setContact] = useState("");

  const modifyA = (event) => {
    event.preventDefault();
    const data = {
      id_publisher: 1,
      title: title,
      description: description,
      time: 1,
      place: place,
      contact: contact
    };
    axios
      .put(`http://localhost:5000/api/annunci/${id}`, data)
      .then((response) => {
        console.log(response);
        setId("");
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
    <form onSubmit={modifyA}>
      <label>
        ID:
        <input
          type="text"
          value={id}
          onChange={(event) => setId(event.target.value)}
        />
      </label>
      <br />
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
      <br />
      <label>
        Contact:
        <input
          type="text"
          value={contact}
          onChange={(event) => setContact(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Modify Ad</button>
    </form>
  );
};

function fetchAnnunci() {
  const response = axios.get('http://localhost:5000/api/annunci');
  return response.data;
}

export {AddAnnuncio, ModifyAnnuncio, AnnunciList, DeleteAnnuncio};
export default Annuncio; 