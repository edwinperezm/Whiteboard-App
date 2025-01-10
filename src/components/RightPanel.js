import React from "react";
import "../styles/components.css";

const RightPanel = ({
  selectedElement,
  strokeColor,
  fillColor,
  strokeWidth,
  onStrokeColorChange,
  onFillColorChange,
  onStrokeWidthChange,
}) => {
  return (
    <div className="right-panel">
      <h3>Properties</h3>
      <div className="property-group">
        <label>Stroke Color</label>
        <input
          type="color"
          value={strokeColor}
          onChange={(e) => onStrokeColorChange(e.target.value)}
        />
      </div>
      <div className="property-group">
        <label>Fill Color</label>
        <input
          type="color"
          value={fillColor}
          onChange={(e) => onFillColorChange(e.target.value)}
        />
      </div>
      <div className="property-group">
        <label>Stroke Width: {strokeWidth}px</label>
        <input
          type="range"
          min="1"
          max="20"
          value={strokeWidth}
          onChange={(e) => onStrokeWidthChange(parseInt(e.target.value))}
        />
      </div>
      {selectedElement && (
        <div className="selection-info">
          <h4>Selected Element</h4>
          <p>Type: {selectedElement.type}</p>
        </div>
      )}
    </div>
  );
};

export default RightPanel;
