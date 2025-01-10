import React, { useState, useEffect, useRef, useCallback } from "react";
import { Stage, Layer, Line, Rect, Text, Transformer } from "react-konva";
import { socket } from "./api";

const SHAPE_TYPES = {
  SELECT: "select",
  RECTANGLE: "rectangle",
  CIRCLE: "circle",
  LINE: "line",
  PENCIL: "pencil",
  TEXT: "text",
};

const getRandomColor = () => {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FDCB6E",
    "#6C5CE7",
    "#A8E6CF",
    "#FF8ED4",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ShapeComponent = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onTextChange,
}) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const renderShape = () => {
    const baseProps = {
      ref: shapeRef,
      ...shapeProps,
      draggable: true,
      onClick: onSelect,
      onDragEnd: (e) => {
        onChange({
          ...shapeProps,
          x: e.target.x(),
          y: e.target.y(),
        });
      },
    };

    switch (shapeProps.type) {
      case SHAPE_TYPES.RECTANGLE:
        return (
          <Rect
            {...baseProps}
            cornerRadius={10}
            stroke={shapeProps.stroke || "black"}
            strokeWidth={shapeProps.strokeWidth || 2}
            onTransformEnd={() => {
              const node = shapeRef.current;
              onChange({
                ...shapeProps,
                x: node.x(),
                y: node.y(),
                width: node.width() * node.scaleX(),
                height: node.height() * node.scaleY(),
                rotation: node.rotation(),
              });
            }}
          />
        );
      case SHAPE_TYPES.TEXT:
        return (
          <Text
            {...baseProps}
            text={shapeProps.text || "Double click to edit"}
            fontSize={shapeProps.fontSize || 16}
            fill={shapeProps.fill || "black"}
            editable={isSelected}
            onDblClick={(e) => {
              const textNode = e.target;
              if (!textNode) return;

              const existingTextarea =
                document.querySelector(".konva-text-editor");
              if (existingTextarea) {
                document.body.removeChild(existingTextarea);
              }

              const textPosition = textNode.getAbsolutePosition();
              const stageBox = textNode
                .getStage()
                .container()
                .getBoundingClientRect();

              const textarea = document.createElement("textarea");
              textarea.classList.add("konva-text-editor");
              document.body.appendChild(textarea);

              textarea.value = textNode.text();
              textarea.style.position = "absolute";
              textarea.style.top = `${stageBox.top + textPosition.y}px`;
              textarea.style.left = `${stageBox.left + textPosition.x}px`;
              textarea.style.width = `${textNode.width() - textNode.padding() * 2}px`;
              textarea.style.height = `${textNode.height() - textNode.padding() * 2}px`;
              textarea.style.fontSize = `${textNode.fontSize()}px`;
              textarea.style.border = "1px solid blue";
              textarea.style.padding = "0px";
              textarea.style.margin = "0px";
              textarea.style.overflow = "hidden";
              textarea.style.background = "white";
              textarea.style.outline = "none";
              textarea.style.resize = "none";
              textarea.style.lineHeight = textNode.lineHeight();
              textarea.style.fontFamily = textNode.fontFamily();
              textarea.style.transformOrigin = "left top";
              textarea.style.textAlign = textNode.align();
              textarea.style.color = textNode.fill();

              textarea.focus();

              let removed = false;

              const removeTextarea = () => {
                if (removed) return;
                removed = true;
                document.body.removeChild(textarea);
                window.removeEventListener("click", handleOutsideClick);
              };

              const handleOutsideClick = (e) => {
                if (e.target !== textarea) {
                  textNode.text(textarea.value);
                  removeTextarea();
                  onTextChange(shapeProps.id, textarea.value);
                }
              };

              textarea.addEventListener("keydown", (e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  textNode.text(textarea.value);
                  removeTextarea();
                  onTextChange(shapeProps.id, textarea.value);
                }
                if (e.key === "Escape") {
                  removeTextarea();
                }
              });

              textarea.addEventListener("blur", () => {
                textNode.text(textarea.value);
                removeTextarea();
                onTextChange(shapeProps.id, textarea.value);
              });

              setTimeout(() => {
                window.addEventListener("click", handleOutsideClick);
              });
            }}
          />
        );
      case SHAPE_TYPES.PENCIL:
        return (
          <Line
            {...baseProps}
            points={shapeProps.points}
            stroke={shapeProps.stroke || "black"}
            strokeWidth={shapeProps.strokeWidth || 5}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {renderShape()}
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

const Canvas = React.memo(({ selectedTool, zoomLevel = 1 }) => {
  const [elements, setElements] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState([]);
  const stageRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (stageRef.current) {
        const stage = stageRef.current;
        stage.width(window.innerWidth);
        stage.height(window.innerHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleElementCreate = (e) => {
    try {
      if (selectedTool === SHAPE_TYPES.SELECT) return;

      const stage = e.target.getStage();
      const point = stage.getPointerPosition();

      if (!point) {
        console.warn("Invalid pointer position");
        return;
      }

      const newElement = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: selectedTool,
        x: point.x,
        y: point.y,
        width: selectedTool === SHAPE_TYPES.TEXT ? 200 : 150,
        height: selectedTool === SHAPE_TYPES.TEXT ? 50 : 100,
        fill: getRandomColor(),
        stroke: "black",
        strokeWidth: 2,
        text: selectedTool === SHAPE_TYPES.TEXT ? "Double click to edit" : "",
        fontSize: 16,
        draggable: true,
        rotation: 0,
      };

      socket.emit("draw", newElement);
      setElements((prev) => [...prev, newElement]);
    } catch (error) {
      console.error("Element creation error:", error);
    }
  };

  const handleMouseDown = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }

    if (selectedTool === SHAPE_TYPES.PENCIL) {
      setDrawing(true);
      const point = e.target.getStage().getPointerPosition();
      setCurrentLine([point.x, point.y]);
    }
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;

    if (selectedTool === SHAPE_TYPES.PENCIL) {
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();
      setCurrentLine((prev) => [...prev, point.x, point.y]);
    }
  };

  const handleMouseUp = () => {
    if (!drawing) return;

    if (selectedTool === SHAPE_TYPES.PENCIL && currentLine.length > 2) {
      const newPencilElement = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: SHAPE_TYPES.PENCIL,
        points: currentLine,
        stroke: "black",
        strokeWidth: 5,
      };

      socket.emit("draw", newPencilElement);
      setElements((prev) => [...prev, newPencilElement]);
    }

    setDrawing(false);
    setCurrentLine([]);
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (!selectedId) return;

      switch (e.key) {
        case "Backspace":
        case "Delete":
          setElements((prev) => prev.filter((elem) => elem.id !== selectedId));
          socket.emit("element-delete", selectedId);
          selectShape(null);
          break;
        case "Escape":
          selectShape(null);
          break;
        default:
          break;
      }
    },
    [selectedId],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    socket.on("draw", (newElement) => {
      setElements((prev) => [...prev, newElement]);
    });

    socket.on("element-delete", (elementId) => {
      setElements((prev) => prev.filter((elem) => elem.id !== elementId));
    });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      socket.off("draw");
      socket.off("element-delete");
    };
  }, [handleKeyDown]);

  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
      scaleX={zoomLevel}
      scaleY={zoomLevel}
      className="konva-container"
      onClick={handleElementCreate}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    >
      <Layer>
        {drawing && currentLine.length >= 2 && (
          <Line
            points={currentLine}
            stroke="black"
            strokeWidth={5}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
          />
        )}

        {elements.map((elem) => (
          <ShapeComponent
            key={elem.id}
            shapeProps={elem}
            isSelected={elem.id === selectedId}
            onSelect={() => selectShape(elem.id)}
            onChange={(newAttrs) => {
              try {
                const updatedElements = elements.map((el) =>
                  el.id === newAttrs.id ? newAttrs : el,
                );
                setElements(updatedElements);
                socket.emit("element-update", newAttrs);
              } catch (error) {
                console.error("Element update error:", error);
              }
            }}
            onTextChange={(id, newText) => {
              const updatedElements = elements.map((elem) =>
                elem.id === id ? { ...elem, text: newText } : elem,
              );
              setElements(updatedElements);
              socket.emit("element-update", { id, text: newText });
            }}
          />
        ))}
      </Layer>
    </Stage>
  );
});

export default Canvas;
