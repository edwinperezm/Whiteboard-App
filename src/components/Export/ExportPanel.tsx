import React from 'react';
import { useAppStore } from '../../store/AppStore';
import { exportToImage, exportToJSON } from '../../services/exportService';

export const ExportPanel = () => {
  const { elements } = useAppStore();
  
  return (
    <div className="export-panel">
      <button onClick={() => exportToImage()}>
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
