import React, {useState} from 'react';
import { Link } from "react-router-dom";

function Menu({menu}) {
  let linkTo = `/${menu}`;
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (menu === 'profileMenu') {
    return (
      <div className="menu-profile">
        <div className="rectangle"></div>
        <div className="rectangle"></div>
      </div>
    );
  }

  return (
    <div className="menu-container">
      <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <Link to={linkTo} className='link-item'><div id='id'      className="menu-item">{menu} </div></Link>
          <div id='map'      className="menu-item">MAP </div>
          <div id='new_post' className="menu-item">+ </div>
        </div>
      )}
    </div>
  );
}

export default Menu;