//pagina che può essere utilizzata per testare pezzi di codice, verrà poi cancellato tutto e qui saranno visibili le statisiche della web-app
import React, { useState, useEffect } from "react";
import axios from "axios";
import Annuncio from "../subcomponents/annuncio";
import Evento from "../subcomponents/evento";
import Cookies from "js-cookie";

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

    const token = Cookies.get('token');

    //console.log(token);
    //console.log(data);

    axios
      .post("http://localhost:5000/api/annunci", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
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
          date={ad.date}
          time={ad.time}
          place={ad.place}
          contact={ad.contact}
        />
      ))}
    </div>
  );
};

function Datas(){
  const date = new Date();
  return (
    <div>
     <AddAnnuncio />
    </div>
  );
}

export {AddAnnuncio, ModifyAnnuncio, AnnunciList};
export default Datas;