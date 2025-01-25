import React from "react";
import { useAppStore } from "../../store/AppStore";

export const ZoomControls: React.FC = () => {
  const store = useAppStore();

  const handleZoomOut = () => {
    store.setZoom(Math.max(0.1, store.zoom - 0.1));
  };

  const handleZoomIn = () => {
    store.setZoom(Math.min(4, store.zoom + 0.1));
  };

  return (
    <div className="zoom-controls">
      <button onClick={handleZoomOut}>-</button>
      <span>{Math.round(store.zoom * 100)}%</span>
      <button onClick={handleZoomIn}>+</button>
    </div>
  );
};
