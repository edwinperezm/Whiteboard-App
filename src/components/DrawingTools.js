import React from "react";
import {
  Gesture,
  Create,
  Title,
  RadioButtonUnchecked,
  Square,
  Timeline,
  PanTool,
  ColorLens,
} from "@mui/icons-material";

const DrawingTools = ({
  selectedTool,
  onToolSelect,
  selectedColor,
  onColorChange,
}) => {
  const tools = [
    { id: "select", icon: <PanTool />, tooltip: "Select" },
    { id: "pencil", icon: <Create />, tooltip: "Pencil" },
    { id: "text", icon: <Title />, tooltip: "Text" },
    { id: "circle", icon: <RadioButtonUnchecked />, tooltip: "Circle" },
    { id: "rectangle", icon: <Square />, tooltip: "Rectangle" },
    { id: "line", icon: <Timeline />, tooltip: "Line" },
  ];

  const colors = [
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFFFFF",
  ];

  return (
    <div className="drawing-tools">
      {tools.map((tool) => (
        <button
          key={tool.id}
          className={`tool-button ${selectedTool === tool.id ? "active" : ""}`}
          onClick={() => onToolSelect(tool.id)}
          title={tool.tooltip}
        >
          {tool.icon}
        </button>
      ))}

      <div className="color-picker">
        <ColorLens />
        <div className="color-grid">
          {colors.map((color) => (
            <button
              key={color}
              className={`color-button ${selectedColor === color ? "active" : ""}`}
              style={{ backgroundColor: color }}
              onClick={() => onColorChange(color)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrawingTools;
