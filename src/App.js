import React, { useState } from "react";
import Canvas from "./Canvas";
import LeftToolbar from "./components/LeftToolbar";
import TopNavBar from "./components/TopNavBar";
import RightPanel from "./components/RightPanel";
import "./App.css";

function App() {
  const [selectedTool, setSelectedTool] = useState("select");
  const [zoomLevel, setZoomLevel] = useState(1);

  // Constants
  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 3;

  // Handle zoom changes
  const handleZoomChange = (newZoom) => {
    const zoomValue = Math.min(Math.max(newZoom, MIN_ZOOM), MAX_ZOOM);
    setZoomLevel(Number(zoomValue.toFixed(2)));
  };

  return (
    <div className="app-container">
      <TopNavBar />
      <div className="workspace">
        <LeftToolbar
          selectedTool={selectedTool}
          onSelectTool={setSelectedTool}
        />

        <div className="canvas-container">
          <Canvas selectedTool={selectedTool} zoomLevel={zoomLevel} />
        </div>

        <RightPanel />
      </div>
    </div>
  );
}

export default App;
