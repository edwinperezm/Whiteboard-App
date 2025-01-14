import React from 'react';
import { Rect, Circle, Line, Text, Transformer } from 'react-konva';

export const Shape = ({ element, isSelected, onSelect }) => {
  const shapeProps = {
    ...element,
    onClick: onSelect,
    draggable: true
  };

  const renderShape = () => {
    switch(element.type) {
      case 'rectangle': return <Rect {...shapeProps} />;
      case 'circle': return <Circle {...shapeProps} />;
      case 'line': return <Line {...shapeProps} />;
      case 'text': return <Text {...shapeProps} />;
      default: return null;
    }
  };

  return (
    <>
      {renderShape()}
      {isSelected && <Transformer />}
    </>
  );
};
