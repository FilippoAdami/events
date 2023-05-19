import React from 'react';
import Account from '../elements/account.js';
import Filter from '../elements/filter.js';
import Logo from '../elements/logo.js';
import Menu from '../subcomponents/menu.js'
import ProfileMenu from '../subcomponents/profileMenu.js';


function Header() {
  return (
    <div id="header">
      <Logo />
      <Filter />
      <Account />
      <Menu />     
    </div>
  );
}

export default Header;