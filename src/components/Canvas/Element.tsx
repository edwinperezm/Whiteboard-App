import React from "react";
import { Rect, Circle, Line, Text } from "react-konva";
import { observer } from "mobx-react-lite";
import { useAppStore } from "../../store/AppStore";
import { Element as ElementType } from "../../core/types";

export const Elements: React.FC = observer(() => {
  const store = useAppStore();

  const renderElement = (element: ElementType) => {
    const baseProps = {
      key: element.id,
      id: element.id,
      x: element.position.x,
      y: element.position.y,
      width: element.properties.width || 0,
      height: element.properties.height || 0,
      fill: element.properties.fill || "#000000",
      stroke: element.properties.stroke || "#000000",
      strokeWidth: element.properties.strokeWidth || 1,
      draggable: store.selectedTool === "select",
      onClick: () => store.selectElement(element.id),
      onDragEnd: (e: any) => {
        store.updateElement({
          ...element,
          position: { x: e.target.x(), y: e.target.y() }
        });
      }
    };

    switch (element.type) {
      case "rectangle":
        return <Rect {...baseProps} />;
      case "circle":
        return (
          <Circle
            {...baseProps}
            radius={(Math.max(element.properties.width || 0, element.properties.height || 0) / 2)}
          />
        );
      case "line":
        return (
          <Line
            {...baseProps}
            points={element.properties.points || []}
            tension={0.5}
          />
        );
      case "text":
        return (
          <Text
            {...baseProps}
            text={element.properties.text || ""}
            fontSize={element.properties.fontSize || 16}
            fontFamily={element.properties.fontFamily || "Arial"}
          />
        );
      default:
        return null;
    }
  };

  return <>{store.elements.map(renderElement)}</>;
});
