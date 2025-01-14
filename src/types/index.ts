export interface User {
    id: string;
    name: string;
    color: string;
  }
  
  export interface Element {
    id: string;
    type: string;
    x: number;
    y: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
  }
  
  export interface CanvasState {
    elements: Element[];
    selectedId: string | null;
    tool: string;
  }
  