import React from 'react';
import { useAppStore } from '../../store/AppStore';

export const Status: React.FC = () => {
  const { zoom, selectedElement, cursorPosition } = useAppStore();
  
  return (
    <div className="status-bar">
      <div>Zoom: {Math.round(zoom * 100)}%</div>
      <div>Position: {cursorPosition.x}, {cursorPosition.y}</div>
      {selectedElement && <div>Selected: {selectedElement.type}</div>}
    </div>
  );
};
