// context/AppContext.js
import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../lib/firebase';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [uid, setUid] = useState(null);

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) setUid(user.uid)
      if (!user) setUid(null)
    });
  }, [])

  return (
    <AppContext.Provider value={{ uid, setUid }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
