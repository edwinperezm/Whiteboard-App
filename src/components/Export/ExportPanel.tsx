import React from 'react';
import { useAppStore } from '../../store/AppStore';
import { exportToImage, exportToJSON } from '../../services/exportService';
import { Stage } from 'konva/lib/Stage';

export const ExportPanel = () => {
  const { elements } = useAppStore();
  
  const handleExport = () => {
    const canvas = document.querySelector('.konvajs-content canvas');
    if (canvas) {
      const stage = (canvas as any)._stage as Stage;
      exportToImage(stage);
    }
  };
  
  return (
    <div className="export-panel">
      <button onClick={handleExport}>
        Export as PNG
      </button>
      <button onClick={() => exportToJSON(elements)}>
        Export as JSON
      </button>
      <button onClick={() => navigator.clipboard.writeText(JSON.stringify(elements))}>
        Copy to Clipboard
      </button>
    </div>
  );
};
