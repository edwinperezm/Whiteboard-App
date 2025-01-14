import React from 'react';
import { useAppStore } from '../../store/AppStore';

export const TransformControls = () => {
  const { selectedElement, updateElement } = useAppStore();
  
  if (!selectedElement) return null;

  return (
    <div className="transform-controls">
      <div className="control-group">
        <label>Position</label>
        <input
          type="number"
          value={selectedElement.x}
          onChange={e => updateElement({ 
            ...selectedElement, 
            x: Number(e.target.value) 
          })}
        />
        <input
          type="number"
          value={selectedElement.y}
          onChange={e => updateElement({ 
            ...selectedElement, 
            y: Number(e.target.value) 
          })}
        />
      </div>
      <div className="control-group">
        <label>Rotation</label>
        <input
          type="number"
          value={selectedElement.rotation || 0}
          onChange={e => updateElement({ 
            ...selectedElement, 
            rotation: Number(e.target.value) 
          })}
        />
      </div>
    </div>
  );
};
