export interface Point {
  x: number;
  y: number;
}

export interface Tool {
  id: string;
  name: string;
  icon: React.ComponentType;
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
  type: string;
  position: Point;
  properties: Record<string, any>;
  data: any;
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
