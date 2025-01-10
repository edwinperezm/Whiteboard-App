import React from "react";

const ShapeProperties = ({ selectedElement, onChange }) => {
  if (!selectedElement) return null;

  const handleColorChange = (e) => {
    onChange({
      ...selectedElement,
      fill: e.target.value,
    });
  };

  const handleStrokeWidthChange = (e) => {
    onChange({
      ...selectedElement,
      strokeWidth: Number(e.target.value),
    });
  };

  return (
    <div className="shape-properties">
      <h3>Properties</h3>

      <div className="property-group">
        <label>Fill Color</label>
        <input
          type="color"
          value={selectedElement.fill || "#000000"}
          onChange={handleColorChange}
        />
      </div>

      <div className="property-group">
        <label>Stroke Width</label>
        <input
          type="range"
          min="1"
          max="20"
          value={selectedElement.strokeWidth || 2}
          onChange={handleStrokeWidthChange}
        />
        <span>{selectedElement.strokeWidth || 2}px</span>
      </div>

      {selectedElement.type === "text" && (
        <div className="property-group">
          <label>Font Size</label>
          <input
            type="number"
            value={selectedElement.fontSize || 16}
            onChange={(e) =>
              onChange({
                ...selectedElement,
                fontSize: Number(e.target.value),
              })
            }
          />
        </div>
      )}
    </div>
  );
};

export default ShapeProperties;
