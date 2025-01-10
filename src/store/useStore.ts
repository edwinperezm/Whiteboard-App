import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { Point, Element, Tool, User } from "../types";

interface AppState {
  // Canvas State
  elements: Element[];
  selectedElements: string[];
  zoom: number;
  pan: Point;

  // Tool State
  currentTool: Tool;
  toolSettings: {
    strokeColor: string;
    fillColor: string;
    strokeWidth: number;
    fontSize: number;
    fontFamily: string;
  };

  // Collaboration State
  users: User[];
  currentUser: User | null;

  // Actions
  setCurrentTool: (tool: Tool) => void;
  addElement: (element: Element) => void;
  updateElement: (id: string, updates: Partial<Element>) => void;
  selectElements: (ids: string[]) => void;
  setZoom: (zoom: number) => void;
  setPan: (pan: Point) => void;
}

export const useStore = create<AppState>()(
  immer((set) => ({
    // Initial state
    elements: [],
    selectedElements: [],
    zoom: 1,
    pan: { x: 0, y: 0 },
    currentTool: "select",
    toolSettings: {
      strokeColor: "#000000",
      fillColor: "#ffffff",
      strokeWidth: 2,
      fontSize: 16,
      fontFamily: "Arial",
    },
    users: [],
    currentUser: null,

    // Actions
    setCurrentTool: (tool) =>
      set((state) => {
        state.currentTool = tool;
      }),

    addElement: (element) =>
      set((state) => {
        state.elements.push(element);
      }),

    updateElement: (id, updates) =>
      set((state) => {
        const element = state.elements.find((el) => el.id === id);
        if (element) {
          Object.assign(element, updates);
        }
      }),

    selectElements: (ids) =>
      set((state) => {
        state.selectedElements = ids;
      }),

    setZoom: (zoom) =>
      set((state) => {
        state.zoom = zoom;
      }),

    setPan: (pan) =>
      set((state) => {
        state.pan = pan;
      }),
  })),
);
