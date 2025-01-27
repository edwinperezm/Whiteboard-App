import React from 'react';
import { Rect, Circle, Line, Text } from 'react-konva';
import { Element, ElementType } from '../../core/types';

interface ShapeProps {
  element: Element;
  isSelected: boolean;
  onSelect: () => void;
}

export const Shape: React.FC<ShapeProps> = ({ element, isSelected, onSelect }) => {
  const shapeProps = {
    id: element.id,
    x: element.position.x,
    y: element.position.y,
    width: element.properties.width ?? 0,
    height: element.properties.height ?? 0,
    fill: element.properties.fill ?? '#000000',
    stroke: element.properties.stroke ?? '#000000',
    strokeWidth: element.properties.strokeWidth ?? 1,
    draggable: true,
    onClick: onSelect,
  };

  switch (element.type) {
    case ElementType.RECTANGLE:
      return <Rect {...shapeProps} />;
    case ElementType.CIRCLE:
      return (
        <Circle
          {...shapeProps}
          radius={(Math.max(shapeProps.width, shapeProps.height) / 2)}
        />
      );
    case ElementType.LINE:
      return (
        <Line
          {...shapeProps}
          points={element.properties.points ?? []}
          tension={0.5}
        />
      );
    case ElementType.TEXT:
      return (
        <Text
          {...shapeProps}
          text={element.properties.text ?? ''}
          fontSize={element.properties.fontSize ?? 16}
          fontFamily={element.properties.fontFamily ?? 'Arial'}
        />
      );
    default:
      return null;
  }
};
