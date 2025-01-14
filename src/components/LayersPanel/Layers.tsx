import React from 'react';
import { useAppStore } from '../../store/AppStore';

export const Layers = () => {
  const { elements, selectedId, selectElement } = useAppStore();

  return (
    <div className="layers-panel">
      {elements.map(element => (
        <div 
          key={element.id}
          className={`layer ${selectedId === element.id ? 'selected' : ''}`}
          onClick={() => selectElement(element.id)}
        >
          <span>{element.type}</span>
          <div className="layer-controls">
            <button>👁️</button>
            <button>🔒</button>
          </div>
        </div>
      ))}
    </div>
  );
};
