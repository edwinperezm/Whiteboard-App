import React from 'react';
import { useAppStore } from '../../store/AppStore';
import { exportToImage, exportToJSON } from '../../services/exportService';

export const FileMenu = () => {
  const { elements } = useAppStore();
  
  return (
    <div className="file-menu">
      <button onClick={() => exportToImage(document.querySelector('canvas'))}>
        Export PNG
      </button>
      <button onClick={() => exportToJSON(elements)}>
        Export JSON
      </button>
    </div>
  );
};
