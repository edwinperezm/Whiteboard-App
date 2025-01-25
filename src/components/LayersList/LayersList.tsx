// filepath: src/components/LayersList/LayersList.tsx
import React from 'react';
import { useAppStore } from '../store';

export const LayersList: React.FC = () => {
  const { elements, selectElement } = useAppStore();

  return (
    <div className="layers-container">
      {/* Layers list will go here */}
    </div>
  );
};
