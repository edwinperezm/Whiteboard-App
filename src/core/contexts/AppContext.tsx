import React, { createContext, useContext, useReducer } from "react";
import { Tool, Element, User } from "../types";

interface AppState {
  selectedTool: Tool | null;
  elements: Element[];
  users: User[];
  selectedElements: string[];
  history: HistoryEntry[];
  zoom: number;
}

type AppAction =
  | { type: "SET_TOOL"; payload: Tool }
  | { type: "ADD_ELEMENT"; payload: Element }
  | {
      type: "UPDATE_ELEMENT";
      payload: { id: string; updates: Partial<Element> };
    }
  | { type: "SELECT_ELEMENTS"; payload: string[] }
  | { type: "SET_ZOOM"; payload: number };

const initialState: AppState = {
  selectedTool: null,
  elements: [],
  users: [],
  selectedElements: [],
  history: [],
  zoom: 1,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({ state: initialState, dispatch: () => null });

export const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
