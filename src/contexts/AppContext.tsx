import React from "react";
import appStore from "../store/AppStore";

export const AppContext = React.createContext(appStore);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <AppContext.Provider value={appStore}>{children}</AppContext.Provider>;
};

// Hook for easy store access
export const useAppStore = () => {
  const store = React.useContext(AppContext);
  if (!store) {
    throw new Error("useAppStore must be used within an AppProvider");
  }
  return store;
};
