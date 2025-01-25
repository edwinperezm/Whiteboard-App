import { useRef, useEffect } from "react";
import { useAppStore } from "../store/AppStore";
import { KonvaEventObject } from "konva/lib/Node";
import { Element, Point } from "../core/types";

export const useCanvas = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { selectedTool, addElement } = useAppStore();

  const handleDraw = (e: KonvaEventObject<MouseEvent>) => {
    const point: Point = {
      x: e.evt.layerX,
      y: e.evt.layerY,
    };

    const newElement: Element = {
      id: Date.now().toString(),
      type: selectedTool,
      position: point,
      properties: {},
      data: null,
    };

    addElement(newElement);
  };

  return { canvasRef, handleDraw };
};
