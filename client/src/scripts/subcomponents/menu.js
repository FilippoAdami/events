import React, {useState} from 'react';
import { Link } from "react-router-dom";
import NewInserzione from './newInserzione';
import ProfileMenu from './profileMenu';

function Menu({menu}) {
  let linkTo = `/${menu}`;
  const [newI, setNewI] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [typeI, setTypeI] = useState('annuncio');
  const [isOpen, setIsOpen] = useState(false);
  //function to toggle the menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  //function to change the state of newI
  const changeNewI = (event) => {
    const { target } = event;
    if (target.classList.contains("newI") || target.classList.contains("newI-item") ){ return;}
    if (target.classList.contains("overlay")){ 
      setNewI(false); 
      setShowForm(false);
      return;}
    else{setNewI(true);}
    
  };
  //function to change the state of showForm
  const changeShowForm = (type) => {
    setShowForm(!showForm);
    setTypeI(type);
  };

  if (menu === 'profileMenu') {
    return (
      <Link to={'./edit'} className='link-item'>
        <ProfileMenu />
      </Link>
    );
  }
  else if (menu === 'editProfileMenu') {
    return (
      <div>
      <Link to={'../profile'} className='link-item'> Profile </Link>
      <Link to={'../'} className='link-item'> Home </Link>
      </div>
    );
  }
  else {
    return (
      <div className="menu-container">
        <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {isOpen && (
          <div className="dropdown-menu">
            <Link to={linkTo} className='link-item'><div id='id' className="menu-item">{menu} </div></Link>
            <div id='map'      className="menu-item">MAP </div>
            <div id='new_post' className="menu-item" onClick={changeNewI}> + </div>
          </div>
        )}
        {newI && (
          <div className="overlay" onClick={changeNewI}>
            { !showForm &&(
              <div id='chooseEA' className="newI">
              <button className="newI-item" onClick={() => changeShowForm('annuncio')}>Annuncio</button>
              <button className="newI-item" onClick={() => changeShowForm('evento')}>Evento</button>
              </div>
            )}
            { showForm &&(
              <NewInserzione typeIns={typeI} />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Menu;