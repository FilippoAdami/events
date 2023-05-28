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
      }).catch((error) => {
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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [time, setTime] = useState("");
  const [contact, setContact] = useState("");
  const id = '647274bdaf7db2e4cf1f35c9dcdc';

  const modifyA = (event) => {
    event.preventDefault();
    const data = {
      title: title,
      description: description,
      time: time,
      place: place,
      contact: contact
    };
    const token = Cookies.get('token');
    
    axios
      .patch(`http://localhost:5000/api/annunci/`+id+'', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        console.log(response);
        setTitle("");
        setDescription("");
        setPlace("");
        setTime("");
        setContact("");
      }).catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={modifyA}>
      <div>ID: 647274bdaf7db2e4cf1f35c9dcdc </div>
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
        Time:
        <input
          type="text"
          value={time}
          onChange={(event) => setTime(event.target.value)}
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

function DeleteAnnuncio() {
  const id = '6473dfd0e56e539ab7c7aaf5';
  const token = Cookies.get('token');

  const deleteA = (event) => {
    event.preventDefault();
    axios.delete('http://localhost:5000/api/annunci/'+id+'', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });   
  };

  return (
    <form onSubmit={deleteA}>
      <div>ID: 6473dfd0e56e539ab7c7aaf5 </div>
      <br />
      <button type="submit">Delete Ad</button>
    </form>
  );
}

function AnnunciPubblicatiList() {
  const [ads, setAds] = useState([]);
  const token = Cookies.get('token');
  const id = Cookies.get('id');

  useEffect(() => {
    axios.get('http://localhost:5000/api/annunci/publisher/'+id+'', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      setAds(response.data.map((annuncio) => (
        <Annuncio
          key={annuncio._id}
          id={annuncio._id}
          id_publisher={annuncio.id_publisher}
          title={annuncio.title}
          description={annuncio.description}
          date={annuncio.date}
          time={annuncio.time}
          place={annuncio.place}
          contact={annuncio.contact}
        />
      )));
    }).catch((error) => {
      console.log(error);
    });

  }, []);

  return (
    <div>
      <h1>Annunci Pubblicati</h1>
      <div>{ads}</div>
    </div>
  );
};



function Datas(){
  const date = new Date();
  return (
    <div>
      <AddAnnuncio />
      <ModifyAnnuncio />
      <DeleteAnnuncio />
      <AnnunciPubblicatiList />
    </div>
  );
}

export {AddAnnuncio, ModifyAnnuncio, AnnunciPubblicatiList};
export default Datas;