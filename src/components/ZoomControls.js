import React from "react";
import { Add, Remove } from "@mui/icons-material";

const ZoomControls = ({ zoomLevel, onZoomChange }) => {
  const zoomIn = () => onZoomChange(zoomLevel * 1.2);
  const zoomOut = () => onZoomChange(zoomLevel / 1.2);
  const resetZoom = () => onZoomChange(1);

  return (
    <div className="zoom-controls">
      <button onClick={zoomOut} className="zoom-button">
        <Remove />
      </button>
      <button onClick={resetZoom} className="zoom-level">
        {Math.round(zoomLevel * 100)}%
      </button>
      <button onClick={zoomIn} className="zoom-button">
        <Add />
      </button>
    </div>
  );
};

export default ZoomControls;
