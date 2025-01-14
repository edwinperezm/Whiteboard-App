import React from 'react';
import { useAppStore } from '../../store/AppStore';

export const CanvasEvents = () => {
  const { handleMouseDown, handleMouseMove, handleMouseUp } = useAppStore();

  return (
    <div 
      className="canvas-events"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
};
