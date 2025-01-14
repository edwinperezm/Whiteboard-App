import React from 'react';
import { useAppStore } from '../../store/AppStore';

export const LayersList = () => {
  const { elements, selectElement } = useAppStore();
  
  return (
    <div className="layers-list">
      <h3>Layers</h3>
      {elements.map(element => (
        <div 
          key={element.id} 
          className="layer-item"
          onClick={() => selectElement(element.id)}
        >
          {element.type}
        </div>
      ))}
    </div>
  );
};
