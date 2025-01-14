import React from 'react';
import { useAppStore } from '../../store/AppStore';

export const PropertyEditor = () => {
  const { selectedElement, updateElement } = useAppStore();

  return (
    <div className="property-editor">
      <h3>Properties</h3>
      {selectedElement && (
        <div className="properties">
          <input 
            type="color" 
            value={selectedElement.fill} 
            onChange={e => updateElement({ ...selectedElement, fill: e.target.value })} 
          />
          <input 
            type="range" 
            min="1" 
            max="20" 
            value={selectedElement.strokeWidth} 
            onChange={e => updateElement({ ...selectedElement, strokeWidth: e.target.value })} 
          />
        </div>
      )}
    </div>
  );
};
