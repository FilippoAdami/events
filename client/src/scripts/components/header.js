import React, {useEffect} from 'react';
import Account from '../elements/account.js';
import Filter from '../elements/filter.js';
import Logo from '../elements/logo.js';
import Menu from '../subcomponents/menu.js'
import ProfileMenu from '../subcomponents/profileMenu.js';


function Header({menu}) {
  return (
    <div id="header">
      <Logo />
      <Filter />
      <Account />
      <Menu menu={menu}/>     
    </div>
  );
}

export default Header;