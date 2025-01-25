import { create } from 'zustand';

// src/store/AppStore.ts
interface AppState {
  zoom: number;
  elements: any[];
  selectedTool: string;
  selectedId: string | null;
  setZoom: (zoom: number) => void;
  addElement: (element: any) => void;
  updateTool: (tool: string) => void;
  selectElement: (id: string) => void;
}

interface Element {
  id: string;
  type: string;
  // Add other properties as needed
}

export const useAppStore = create<AppState>((set) => ({
  zoom: 1,
  elements: [],
  selectedTool: 'select',
  selectedId: null,
  setZoom: (zoom) => set({ zoom }),
  addElement: (element) => set((state) => ({ 
    elements: [...state.elements, element] 
  })),
  updateTool: (tool) => set({ selectedTool: tool }),
  selectElement: (id) => set({ selectedId: id })
}));