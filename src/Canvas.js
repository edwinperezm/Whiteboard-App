import React, { useState, useEffect, useRef } from "react";
import {
  Stage,
  Layer,
  Line,
  Rect,
  Circle,
  Text,
  Transformer,
} from "react-konva";

const Canvas = ({
  selectedTool,
  zoomLevel,
  strokeColor,
  fillColor,
  strokeWidth,
  onElementSelect,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const stageRef = useRef(null);
  const layerRef = useRef(null);

  useEffect(() => {
    if (selectedId) {
      onElementSelect(elements.find((el) => el.id === selectedId));
    } else {
      onElementSelect(null);
    }
  }, [selectedId, elements, onElementSelect]);

  const handleMouseDown = (e) => {
    if (selectedTool === "select") {
      const clickedOnEmpty = e.target === e.target.getStage();
      if (clickedOnEmpty) {
        setSelectedId(null);
        return;
      }
      return;
    }

    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    const newElement = {
      id: Date.now().toString(),
      type: selectedTool,
      points: [pos.x, pos.y],
      strokeColor: strokeColor,
      fillColor: fillColor,
      strokeWidth: strokeWidth,
    };

    if (selectedTool === "text") {
      newElement.text = "Double click to edit";
      newElement.fontSize = 20;
    }

    setElements([...elements, newElement]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const point = e.target.getStage().getPointerPosition();
    const lastElement = elements[elements.length - 1];

    if (lastElement) {
      let updatedElement = { ...lastElement };

      switch (selectedTool) {
        case "pencil":
          updatedElement.points = [...lastElement.points, point.x, point.y];
          break;
        case "rectangle":
          updatedElement.width = point.x - lastElement.points[0];
          updatedElement.height = point.y - lastElement.points[1];
          break;
        case "circle":
          const dx = point.x - lastElement.points[0];
          const dy = point.y - lastElement.points[1];
          updatedElement.radius = Math.sqrt(dx * dx + dy * dy);
          break;
        default:
          break;
      }

      setElements([...elements.slice(0, -1), updatedElement]);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleTextDblClick = (textNode) => {
    const textPosition = textNode.absolutePosition();
    const stageBox = stageRef.current.container().getBoundingClientRect();

    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);

    textarea.value = textNode.text();
    textarea.style.position = "absolute";
    textarea.style.top = `${stageBox.top + textPosition.y}px`;
    textarea.style.left = `${stageBox.left + textPosition.x}px`;
    textarea.style.fontSize = `${textNode.fontSize()}px`;
    textarea.style.padding = "0px";
    textarea.style.margin = "0px";
    textarea.style.border = "none";
    textarea.style.outline = "none";

    textarea.focus();

    textarea.addEventListener("blur", () => {
      const element = elements.find((el) => el.id === textNode.id());
      if (element) {
        const updatedElement = { ...element, text: textarea.value };
        setElements(
          elements.map((el) => (el.id === element.id ? updatedElement : el)),
        );
      }
      document.body.removeChild(textarea);
    });
  };

  const renderElement = (element) => {
    const commonProps = {
      key: element.id,
      id: element.id,
      stroke: element.strokeColor,
      strokeWidth: element.strokeWidth,
      fill: element.fillColor,
      draggable: selectedTool === "select",
      onClick: () => setSelectedId(element.id),
    };

    switch (element.type) {
      case "pencil":
        return <Line {...commonProps} points={element.points} />;
      case "rectangle":
        return (
          <Rect
            {...commonProps}
            x={element.points[0]}
            y={element.points[1]}
            width={element.width || 0}
            height={element.height || 0}
          />
        );
      case "circle":
        return (
          <Circle
            {...commonProps}
            x={element.points[0]}
            y={element.points[1]}
            radius={element.radius || 0}
          />
        );
      case "text":
        return (
          <Text
            {...commonProps}
            x={element.points[0]}
            y={element.points[1]}
            text={element.text}
            fontSize={element.fontSize}
            onDblClick={(e) => handleTextDblClick(e.target)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
      scaleX={zoomLevel}
      scaleY={zoomLevel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer ref={layerRef}>
        {elements.map(renderElement)}
        {selectedId && (
          <Transformer
            visible={selectedTool === "select"}
            boundBoxFunc={(oldBox, newBox) => {
              return newBox;
            }}
          />
        )}
      </Layer>
    </Stage>
  );
};

export default Canvas;
