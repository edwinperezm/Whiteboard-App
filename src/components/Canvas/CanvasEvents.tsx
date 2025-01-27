import React from 'react';
import { useAppStore } from '../../store/AppStore';

export const CanvasEvents: React.FC = () => {
  const store = useAppStore();

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    store.handleMouseDown(e.nativeEvent);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (store.isDrawing) {
      store.handleMouseMove(e.nativeEvent);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    store.handleMouseUp(e.nativeEvent);
  };

  return (
    <div 
      className="canvas-events"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        cursor: store.selectedTool === 'select' ? 'default' : 'crosshair'
      }}
    />
  );
};
