import React from 'react';
import { PropertyEditor } from './PropertyEditor';
import { LayersList } from './LayersList';

export const RightPanel = () => {
  return (
    <div className="right-panel">
      <PropertyEditor />
      <LayersList />
    </div>
  );
};
