import React from "react";
import "../styles/components.css";

const LeftToolbar = ({ selectedTool, onSelectTool }) => {
  const tools = [
    { id: "select", icon: "👆", label: "Select" },
    { id: "pencil", icon: "✏️", label: "Pencil" },
    { id: "rectangle", icon: "⬜", label: "Rectangle" },
    { id: "circle", icon: "⭕", label: "Circle" },
    { id: "text", icon: "T", label: "Text" },
    { id: "eraser", icon: "🧽", label: "Eraser" },
  ];

  return (
    <div className="left-toolbar">
      {tools.map((tool) => (
        <button
          key={tool.id}
          className={`tool-button ${selectedTool === tool.id ? "active" : ""}`}
          onClick={() => onSelectTool(tool.id)}
          title={tool.label}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  );
};

export default LeftToolbar;
