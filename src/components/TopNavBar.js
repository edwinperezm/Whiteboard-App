import React from "react";
import "../styles/components.css";

const TopNavBar = () => {
  const handleExport = () => {
    // Implement export functionality
  };

  const handleSave = () => {
    // Implement save functionality
  };

  return (
    <div className="top-nav">
      <div className="left-section">
        <h1 className="app-title">Whiteboard</h1>
      </div>
      <div className="middle-section">
        <button className="nav-button" onClick={handleSave}>
          Save
        </button>
        <button className="nav-button" onClick={handleExport}>
          Export
        </button>
      </div>
      <div className="right-section">
        <button className="share-button">Share</button>
      </div>
    </div>
  );
};

export default TopNavBar;
