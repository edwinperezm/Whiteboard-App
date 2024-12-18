import React, { useState } from "react";

const Toolbar = ({ onSelectTool }) => {
  const [selectedTool, setSelectedTool] = useState("Select");

  const tools = [
    "Select", "Rectangle", "Text"
  ];

  const handleToolClick = (tool) => {
    setSelectedTool(tool);
    onSelectTool(tool);
  };

  return (
    <div className="toolbar">
      {tools.map(tool => (
        <button 
          key={tool}
          onClick={() => handleToolClick(tool)}
          className={selectedTool === tool ? "active" : ""}
        >
          {tool}
        </button>
      ))}
    </div>
  );
};

export default Toolbar;