import React from 'react';
import { useAppStore } from '../../store/AppStore';
import { exportToImage, exportToJSON } from '../../services/exportService';
import { Stage } from 'konva/lib/Stage';

export const FileMenu = () => {
  const { elements } = useAppStore();
  
  const handleExport = () => {
    const canvas = document.querySelector('.konvajs-content canvas');
    if (canvas) {
      const stage = (canvas as any)._stage as Stage;
      exportToImage(stage);
    }
  };
  
  return (
    <div className="file-menu">
      <button onClick={handleExport}>
        Export PNG
      </button>
      <button onClick={() => exportToJSON(elements)}>
        Export JSON
      </button>
    </div>
  );
};
