// filepath: src/components/LayersList/LayersList.tsx
import React from 'react';
import { useAppStore } from '../../store/AppStore';

export const LayersList = () => {
  const { elements } = useAppStore();

  return (
    <div className="layers-list">
      {elements.map((element) => (
        <div key={element.id} className="layer-item">
          {element.type} - {element.id}
        </div>
      ))}
    </div>
  );
};
