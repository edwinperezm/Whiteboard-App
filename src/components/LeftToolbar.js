import React from "react";

const LeftToolbar = ({ selectedTool, onSelectTool }) => {
  const tools = [
    {
      name: "select",
      icon: "👆",
      tooltip: "Select and move",
    },
    {
      name: "rectangle",
      icon: "⬜",
      tooltip: "Rectangle",
    },
    {
      name: "circle",
      icon: "⭕",
      tooltip: "Circle",
    },
    {
      name: "text",
      icon: "T",
      tooltip: "Text",
    },
    {
      name: "pencil",
      icon: "✏️",
      tooltip: "Draw",
    },
  ];

  return (
    <div className="left-toolbar">
      {tools.map((tool) => (
        <button
          key={tool.name}
          className={`tool-button ${selectedTool === tool.name ? "active" : ""}`}
          onClick={() => onSelectTool(tool.name)}
          title={tool.tooltip}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  );
};

export default LeftToolbar;
