import React, { useRef, useEffect } from "react";
import { Rect, Text, Line, Transformer } from "react-konva";

export const SHAPE_TYPES = {
  SELECT: "select",
  RECTANGLE: "rectangle",
  CIRCLE: "circle",
  LINE: "line",
  PENCIL: "pencil",
  TEXT: "text",
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
              // Text editing logic here
              // ... (rest of the text editing code)
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

export default ShapeComponent;
