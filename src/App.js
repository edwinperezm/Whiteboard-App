import React, { useState } from "react";
import Canvas from "./Canvas";
import LeftToolbar from "./components/LeftToolbar";
import TopNavBar from "./components/TopNavBar";
import RightPanel from "./components/RightPanel";
import "./App.css";

function App() {
  const [selectedTool, setSelectedTool] = useState("pencil");

  return (
    <div className="app-container">
      <TopNavBar />
      <div className="workspace">
        <LeftToolbar
          selectedTool={selectedTool}
          onSelectTool={setSelectedTool}
        />
        <div className="canvas-container">
          <Canvas selectedTool={selectedTool} />
        </div>
        <RightPanel />
      </div>
    </div>
  );
}

export default App;
