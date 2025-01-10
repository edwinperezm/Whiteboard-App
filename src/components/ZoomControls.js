import React from "react";
import "../styles/components.css";

const ZoomControls = ({ zoomLevel, onZoomChange }) => {
  const handleZoomIn = () => {
    onZoomChange(Math.min(zoomLevel * 1.2, 3));
  };

  const handleZoomOut = () => {
    onZoomChange(Math.max(zoomLevel / 1.2, 0.5));
  };

  const handleReset = () => {
    onZoomChange(1);
  };

  return (
    <div className="zoom-controls">
      <button onClick={handleZoomOut} title="Zoom Out">
        -
      </button>
      <button onClick={handleReset}>{Math.round(zoomLevel * 100)}%</button>
      <button onClick={handleZoomIn} title="Zoom In">
        +
      </button>
    </div>
  );
};

export default ZoomControls;
