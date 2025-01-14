import { create } from 'zustand';
interface AppState {
  zoom: number;
  elements: Element[];
  selectedTool: string;
  setZoom: (zoom: number) => void;
  addElement: (element: Element) => void;
  updateTool: (tool: string) => void;
}

interface Element {
  // Define the properties of your Element type here
  // For example:
  id: string;
  type: string;
  // Add other properties as needed
}

export const useAppStore = create<AppState>((set) => ({
  zoom: 1,
  elements: [],
  selectedTool: 'select',
  setZoom: (zoom) => set({ zoom }),
  addElement: (element) => set((state) => ({ 
    elements: [...state.elements, element] 
  })),
  updateTool: (tool) => set({ selectedTool: tool })
}));
