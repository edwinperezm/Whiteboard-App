import { ComponentType } from "react";

export interface Point {
  x: number;
  y: number;
}

export enum ElementType {
  RECTANGLE = "rectangle",
  CIRCLE = "circle",
  LINE = "line",
  TEXT = "text",
  FREEHAND = "freehand",
  SELECT = "select",
}

export interface ElementProperties {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  text?: string;
  rotation?: number;
  [key: string]: any;
}

export interface Tool {
  id: string;
  name: string;
  icon: ComponentType;
  shortcut: string;
  cursor: string;
  properties: ToolProperty[];
}

export interface ToolProperty {
  id: string;
  type: "color" | "number" | "select" | "boolean";
  label: string;
  defaultValue: any;
}

export interface Element {
  id: string;
  type: ElementType;
  position: Point;
  properties: ElementProperties; // Use the specific interface instead of Record<string, any>
  data?: any; // Made optional since it might not always be needed
}

export interface User {
  id: string;
  name: string;
  color: string;
  cursor?: Point;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  userId: string;
  action: string;
  data: any;
}

export interface CanvasState {
  elements: Element[];
  selectedId: string | null;
  tool: ElementType;
}

// Add a Guide interface that can be used across components
export interface Guide {
  x: number;
  y: number;
  width: number;
  height: number;
}
