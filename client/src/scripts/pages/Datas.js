import React, { useState, useEffect } from "react";
import axios from "axios";

const AddAnnuncio = () => {
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

function ShowAnnunci() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/annunci")
      .then((response) => setAds(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>GET Annunci</h1>
      <textarea value={JSON.stringify(ads, null, 2)} readOnly />
    </div>
  );
};

function ModifyAnnuncio() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (event) => {
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
    <form onSubmit={handleSubmit}>
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

function DeleteAnnuncio() {
  const [id, setId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .delete(`http://localhost:5000/api/annunci/${id}`)
      .then((response) => {
        console.log(response);
        setId("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Delete Ad</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input
            type="text"
            value={id}
            onChange={(event) => setId(event.target.value)}
          />
        </label>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
};

class Datas extends React.Component{
  render(){
  return (
    <div>
      <AddAnnuncio /> <ShowAnnunci /> <ModifyAnnuncio /> <DeleteAnnuncio />
    </div>
  );
}
}

export default Datas;