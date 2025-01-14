import React, { createContext, useContext, ReactNode } from 'react';
import { useAppStore } from '../store/AppStore';

interface AppContextType {
  zoom: number;
  elements: any[];
  selectedTool: string;
  updateTool: (tool: string) => void;
  addElement: (element: any) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const store = useAppStore();
  
  return (
    <AppContext.Provider value={store}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};