import React, { useState } from "react";
import Canvas from "./Canvas";
import LeftToolbar from "./components/LeftToolbar";
import TopNavBar from "./components/TopNavBar";
import RightPanel from "./components/RightPanel";
import ZoomControls from "./components/ZoomControls";
import "./App.css";
import "./styles/components.css";

function App() {
  const [selectedTool, setSelectedTool] = useState("select");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedElement, setSelectedElement] = useState(null);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [fillColor, setFillColor] = useState("#ffffff");
  const [strokeWidth, setStrokeWidth] = useState(2);

  return (
    <div className="app-container">
      <TopNavBar />
      <div className="workspace">
        <LeftToolbar
          selectedTool={selectedTool}
          onSelectTool={setSelectedTool}
        />
        <div className="canvas-container">
          <Canvas
            selectedTool={selectedTool}
            zoomLevel={zoomLevel}
            strokeColor={strokeColor}
            fillColor={fillColor}
            strokeWidth={strokeWidth}
            onElementSelect={setSelectedElement}
          />
        </div>
        <RightPanel
          selectedElement={selectedElement}
          strokeColor={strokeColor}
          fillColor={fillColor}
          strokeWidth={strokeWidth}
          onStrokeColorChange={setStrokeColor}
          onFillColorChange={setFillColor}
          onStrokeWidthChange={setStrokeWidth}
        />
        <ZoomControls zoomLevel={zoomLevel} onZoomChange={setZoomLevel} />
      </div>
    </div>
  );
}

export default App;
