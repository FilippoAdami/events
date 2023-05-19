import React, { useState } from 'react';
import AppContext from './AppContext';

const AppProvider = ({ children }) => {
  const [myGlobalVariable, setMyGlobalVariable] = useState('eventi');

  // Pass the state and functions to the context provider
  return (
    <AppContext.Provider value={{ myGlobalVariable, setMyGlobalVariable }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;