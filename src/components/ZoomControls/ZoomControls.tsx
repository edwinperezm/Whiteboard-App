import React from 'react';
import { useAppStore } from '../../store/AppStore';

export const ZoomControls = () => {
  const { zoom, setZoom } = useAppStore();
  
  return (
    <div className="zoom-controls">
      <button onClick={() => setZoom(zoom - 0.1)}>-</button>
      <span>{Math.round(zoom * 100)}%</span>
      <button onClick={() => setZoom(zoom + 0.1)}>+</button>
    </div>
  );
};
