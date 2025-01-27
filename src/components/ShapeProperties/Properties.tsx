import React from 'react';
import { useAppStore } from '../../store/AppStore';

export const Properties: React.FC = () => {
  const { selectedElement, updateElement } = useAppStore();

  if (!selectedElement) return null;

  return (
    <div className="shape-properties">
      <div className="property">
        <label>Fill</label>
        <input 
          type="color" 
          value={selectedElement.properties.fill || '#000000'}
          onChange={e => updateElement({ 
            ...selectedElement, 
            properties: {
              ...selectedElement.properties,
              fill: e.target.value 
            }
          })}
        />
      </div>
      <div className="property">
        <label>Stroke Width</label>
        <input 
          type="number" 
          value={selectedElement.properties.strokeWidth || 1}
          onChange={e => updateElement({ 
            ...selectedElement, 
            properties: {
              ...selectedElement.properties,
              strokeWidth: Number(e.target.value) 
            }
          })}
        />
      </div>
    </div>
  );
};
