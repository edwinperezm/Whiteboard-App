import React from "react";
import { Rect, Circle, Line, Text } from "react-konva";
import { observer } from "mobx-react-lite";
import { useAppStore } from "../../store/AppStore";
import { Element, ElementType } from "../../core/types";

export const Elements: React.FC = observer(() => {
  const store = useAppStore();

  const renderElement = (element: Element) => {
    const baseProps = {
      key: element.id,
      x: element.position.x,
      y: element.position.y,
      ...element.properties,
      draggable: true,
      onClick: () => store.setSelectedElement(element),
      onDragEnd: (e: any) => {
        store.updateElement({
          ...element,
          position: {
            x: e.target.x(),
            y: e.target.y(),
          },
        });
      },
    };

    switch (element.type) {
      case ElementType.RECTANGLE:
        return <Rect {...baseProps} />;
      case ElementType.CIRCLE:
        return <Circle {...baseProps} />;
      case ElementType.LINE:
        return <Line {...baseProps} />;
      case ElementType.TEXT:
        return <Text {...baseProps} />;
      default:
        return null;
    }
  };

  return <>{store.elements.map(renderElement)}</>;
});
