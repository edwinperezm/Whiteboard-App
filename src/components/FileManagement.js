import React, { useState } from "react";
import {
  Save,
  FolderOpen,
  Download,
  Share,
  DeleteOutline,
} from "@mui/icons-material";
import {
  exportCanvasAsPNG,
  exportCanvasAsJSON,
} from "../services/exportService";

const FileManagement = ({ canvasRef, canvasState, onLoad, onClear }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleExportPNG = () => {
    if (canvasRef.current) {
      exportCanvasAsPNG(canvasRef.current);
    }
  };

  const handleExportJSON = () => {
    exportCanvasAsJSON(canvasState);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedState = JSON.parse(e.target.result);
        onLoad(importedState);
      } catch (error) {
        console.error("Error importing file:", error);
        alert("Invalid file format");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="file-management">
      <button
        className="file-menu-button"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        File
      </button>

      {showDropdown && (
        <div className="file-dropdown">
          <button onClick={handleExportPNG}>
            <Download /> Export as PNG
          </button>

          <button onClick={handleExportJSON}>
            <Save /> Save as JSON
          </button>

          <label className="file-button">
            <FolderOpen /> Import File
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              style={{ display: "none" }}
            />
          </label>

          <button className="share-button">
            <Share /> Share
          </button>

          <button className="clear-button" onClick={onClear}>
            <DeleteOutline /> Clear Canvas
          </button>
        </div>
      )}
    </div>
  );
};

export default FileManagement;
