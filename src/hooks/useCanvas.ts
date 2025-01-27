import { useRef, useEffect } from "react";
import { useAppStore } from "../store/AppStore";
import { KonvaEventObject } from "konva/lib/Node";
import { Element, Point, ElementType } from "../core/types";

export const useCanvas = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { selectedTool, addElement } = useAppStore();

  const handleDraw = (e: KonvaEventObject<MouseEvent>) => {
    const point: Point = {
      x: e.evt.offsetX,
      y: e.evt.offsetY,
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

  const handleStartDrawing = (point: Point) => {
    if (!selectedTool || selectedTool === ElementType.SELECT) return;

    const newElement: Element = {
      id: Date.now().toString(),
      type: selectedTool as ElementType,
      position: point,
      properties: {},
    };

    addElement(newElement);
  };

  return { canvasRef, handleDraw, handleStartDrawing };
};
