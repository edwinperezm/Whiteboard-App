import { useRef } from 'react';
import { useAppStore } from '../store/AppStore';

export const useCanvas = () => {
  const canvasRef = useRef(null);
  const { selectedTool, addElement } = useAppStore();

  const handleDraw = (e) => {
    const point = {
      x: e.evt.layerX,
      y: e.evt.layerY
    };

    addElement({
      id: Date.now().toString(),
      type: selectedTool,
      ...point
    });
  };

  return { canvasRef, handleDraw };
};
