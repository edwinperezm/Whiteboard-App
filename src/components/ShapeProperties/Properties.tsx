import React from 'react';
import { useAppStore } from '../../store/AppStore';

export const Properties = () => {
  const { selectedElement, updateElement } = useAppStore();

  if (!selectedElement) return null;

  return (
    <div className="shape-properties">
      <div className="property">
        <label>Fill</label>
        <input 
          type="color" 
          value={selectedElement.fill}
          onChange={e => updateElement({ 
            ...selectedElement, 
            fill: e.target.value 
          })}
        />
      </div>
      <div className="property">
        <label>Stroke</label>
        <input 
          type="number" 
          value={selectedElement.strokeWidth}
          onChange={e => updateElement({ 
            ...selectedElement, 
            strokeWidth: Number(e.target.value) 
          })}
        />
      </div>
    </div>
  );
};
