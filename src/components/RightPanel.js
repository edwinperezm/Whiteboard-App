import React from "react";

const RightPanel = () => {
  return (
    <div className="right-panel">
      <div className="panel-section">
        <h3>Properties</h3>
        <div className="properties-list">
          <div className="property-item">
            <label>Fill Color</label>
            <input type="color" defaultValue="#000000" />
          </div>
          <div className="property-item">
            <label>Stroke Width</label>
            <input type="range" min="1" max="20" defaultValue="2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
