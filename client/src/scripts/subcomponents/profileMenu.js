import Cookies from 'js-cookie';
import React from 'react';
import Account from '../elements/account';

function ProfileMenu() {
  const email = Cookies.get('email');
  return (
    <div id="profileMenu">
        <div className="userEmail">{email}</div>
        <Account />
    </div>
  );
}

export default ProfileMenu;