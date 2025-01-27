import { ComponentType } from "react";
import { SvgIconProps } from "@mui/material";

export interface Point {
  x: number;
  y: number;
}

export enum ElementType {
  SELECT = "select",
  RECTANGLE = "rectangle",
  CIRCLE = "circle",
  LINE = "line",
  TEXT = "text"
}

export interface ElementProperties {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  points?: number[];
  radius?: number;
  rotation?: number;
}

export interface Element {
  id: string;
  type: ElementType;
  position: Point;
  properties: ElementProperties;
}

export interface Tool {
  id: ElementType;
  name: string;
  icon: ComponentType<SvgIconProps>;
  shortcut: string;
  cursor: string;
  properties: ElementProperties;
}

export interface User {
  id: string;
  name: string;
  color: string;
  cursor?: Point;
}

export interface CanvasState {
  elements: Element[];
  version: number;
}

export interface Bounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

export interface Guide {
  position: number;
  orientation: 'horizontal' | 'vertical';
}
