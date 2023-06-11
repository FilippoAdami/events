import React from 'react';

function Account() {
  return (
    <div id="account">
      <img src={require('./account.ico')} alt="Account" />
      <img src={require('./settings.ico')} alt="Settings" />
    </div>
  );
}

export default Account;