import React, { createContext, useContext } from 'react';
import { useAppStore } from '../../store/AppStore';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const store = useAppStore();
  
  return (
    <AppContext.Provider value={store}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
