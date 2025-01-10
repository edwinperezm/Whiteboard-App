import React from "react";

const LeftToolbar = ({ selectedTool, onSelectTool }) => {
  const tools = [
    {
      name: "select",
      icon: "👆",
      tooltip: "Select (V)",
    },
    {
      name: "pencil",
      icon: "✏️",
      tooltip: "Pencil (P)",
    },
    {
      name: "rectangle",
      icon: "⬜",
      tooltip: "Rectangle (R)",
    },
    {
      name: "text",
      icon: "T",
      tooltip: "Text (T)",
    },
    {
      name: "eraser",
      icon: "🧽",
      tooltip: "Eraser (E)",
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
