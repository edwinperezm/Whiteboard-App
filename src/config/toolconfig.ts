import { ElementType, Tool } from '../core/types';
import { 
  Square, 
  Circle, 
  TextFields, 
  Timeline, 
  PanTool 
} from '@mui/icons-material';

export const TOOLS: Record<string, Tool> = {
  select: {
    id: ElementType.SELECT,
    name: "Select",
    icon: PanTool,
    shortcut: "V",
    cursor: "default",
    properties: {}
  },
  rectangle: {
    id: ElementType.RECTANGLE,
    name: "Rectangle",
    icon: Square,
    shortcut: "R",
    cursor: "crosshair",
    properties: {
      width: 0,
      height: 0,
      fill: "#ffffff",
      stroke: "#000000",
      strokeWidth: 1
    }
  },
  circle: {
    id: ElementType.CIRCLE,
    name: "Circle",
    icon: Circle,
    shortcut: "C",
    cursor: "crosshair",
    properties: {
      width: 0,
      height: 0,
      fill: "#ffffff",
      stroke: "#000000",
      strokeWidth: 1
    }
  },
  line: {
    id: ElementType.LINE,
    name: "Line",
    icon: Timeline,
    shortcut: "L",
    cursor: "crosshair",
    properties: {
      points: [],
      stroke: "#000000",
      strokeWidth: 1
    }
  },
  text: {
    id: ElementType.TEXT,
    name: "Text",
    icon: TextFields,
    shortcut: "T",
    cursor: "text",
    properties: {
      text: "",
      fontSize: 16,
      fontFamily: "Arial",
      fill: "#000000"
    }
  }
};
  