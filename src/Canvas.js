import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Line, Rect, Text, Transformer } from "react-konva";
import { socket } from "./api";

const Canvas = ({ selectedTool }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const stageRef = useRef(null);
  const trRef = useRef(null);

  // Properties state
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [fillColor, setFillColor] = useState("#ffffff");
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [fontSize, setFontSize] = useState(20);

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };

  const handleMouseDown = (e) => {
    if (selectedTool === "select") {
      checkDeselect(e);
      return;
    }

    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setStartPoint(pos);

    if (selectedTool === "text") {
      const newTextElement = {
        id: `${Date.now()}`,
        type: "text",
        x: pos.x,
        y: pos.y,
        text: "Double click to edit",
        fontSize: fontSize,
        fill: strokeColor,
        draggable: true,
      };
      setElements([...elements, newTextElement]);
    } else if (selectedTool === "pencil") {
      const newLine = {
        id: `${Date.now()}`,
        type: "line",
        points: [pos.x, pos.y],
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        tension: 0.5,
        lineCap: "round",
        lineJoin: "round",
      };
      setElements([...elements, newLine]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const pos = e.target.getStage().getPointerPosition();

    if (selectedTool === "pencil") {
      const lastElement = elements[elements.length - 1];
      if (lastElement && lastElement.type === "line") {
        const newPoints = [...lastElement.points, pos.x, pos.y];
        const updatedElement = { ...lastElement, points: newPoints };
        setElements([...elements.slice(0, -1), updatedElement]);
      }
    } else if (selectedTool === "rectangle") {
      const lastElement = elements[elements.length - 1];
      if (lastElement && lastElement.type === "rectangle") {
        const updatedElement = {
          ...lastElement,
          width: pos.x - startPoint.x,
          height: pos.y - startPoint.y,
        };
        setElements([...elements.slice(0, -1), updatedElement]);
      } else {
        const newRect = {
          id: `${Date.now()}`,
          type: "rectangle",
          x: startPoint.x,
          y: startPoint.y,
          width: pos.x - startPoint.x,
          height: pos.y - startPoint.y,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          draggable: true,
        };
        setElements([...elements, newRect]);
      }
    } else if (selectedTool === "eraser") {
      setElements(
        elements.filter((elem) => {
          if (elem.type === "line") {
            // Check if eraser touches the line
            for (let i = 0; i < elem.points.length; i += 2) {
              const dx = elem.points[i] - pos.x;
              const dy = elem.points[i + 1] - pos.y;
              if (Math.sqrt(dx * dx + dy * dy) < strokeWidth) {
                return false;
              }
            }
          }
          return true;
        }),
      );
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  // Handle text editing
  const handleTextDblClick = (e, element) => {
    const textNode = e.target;
    const stage = textNode.getStage();
    const textPosition = textNode.absolutePosition();

    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);

    textarea.value = element.text;
    textarea.style.position = "absolute";
    textarea.style.top = `${textPosition.y}px`;
    textarea.style.left = `${textPosition.x}px`;
    textarea.style.width = `${textNode.width()}px`;
    textarea.style.height = `${textNode.height()}px`;
    textarea.style.fontSize = `${element.fontSize}px`;
    textarea.style.border = "none";
    textarea.style.padding = "0px";
    textarea.style.margin = "0px";
    textarea.style.overflow = "hidden";
    textarea.style.background = "none";
    textarea.style.outline = "none";
    textarea.style.resize = "none";

    textarea.focus();

    textarea.addEventListener("blur", function () {
      const updatedElements = elements.map((elem) =>
        elem.id === element.id ? { ...elem, text: textarea.value } : elem,
      );
      setElements(updatedElements);
      document.body.removeChild(textarea);
    });
  };

  return (
    <>
      {/* Properties Editor */}
      <div className="properties-editor">
        <div className="property">
          <label>Stroke Color:</label>
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
          />
        </div>
        <div className="property">
          <label>Fill Color:</label>
          <input
            type="color"
            value={fillColor}
            onChange={(e) => setFillColor(e.target.value)}
          />
        </div>
        <div className="property">
          <label>Stroke Width:</label>
          <input
            type="range"
            min="1"
            max="50"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
          />
        </div>
        <div className="property">
          <label>Font Size:</label>
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
          />
        </div>
      </div>

      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        ref={stageRef}
      >
        <Layer>
          {elements.map((element) => {
            if (element.type === "line") {
              return (
                <Line
                  key={element.id}
                  {...element}
                  onClick={() => setSelectedId(element.id)}
                />
              );
            } else if (element.type === "rectangle") {
              return (
                <Rect
                  key={element.id}
                  {...element}
                  onClick={() => setSelectedId(element.id)}
                />
              );
            } else if (element.type === "text") {
              return (
                <Text
                  key={element.id}
                  {...element}
                  onClick={() => setSelectedId(element.id)}
                  onDblClick={(e) => handleTextDblClick(e, element)}
                />
              );
            }
            return null;
          })}
          {selectedId && (
            <Transformer
              ref={trRef}
              boundBoxFunc={(oldBox, newBox) => {
                return newBox;
              }}
            />
          )}
        </Layer>
      </Stage>
    </>
  );
};

export default Canvas;
