import { useRef, useEffect, useCallback } from "react";
import { useApp } from "../contexts/AppContext";
import { Point } from "../types";

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { state, dispatch } = useApp();

  const getPointerPosition = useCallback(
    (event: MouseEvent): Point => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };

      const rect = canvas.getBoundingClientRect();
      return {
        x: (event.clientX - rect.left) / state.zoom,
        y: (event.clientY - rect.top) / state.zoom,
      };
    },
    [state.zoom],
  );

  const startDrawing = useCallback(
    (event: MouseEvent) => {
      const pos = getPointerPosition(event);
      // Drawing logic based on selected tool
    },
    [getPointerPosition, state.selectedTool],
  );

  // More canvas-related methods...

  return {
    canvasRef,
    getPointerPosition,
    startDrawing,
    // ... other methods
  };
};
