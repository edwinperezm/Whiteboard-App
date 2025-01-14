import React from 'react';
import { Rect, Transformer } from 'react-konva';
import { useAppStore } from '../../store/AppStore';

export const SelectionBox = () => {
  const { selectedElements, updateElements } = useAppStore();
  
  return (
    <>
      {selectedElements.map(element => (
        <Transformer
          key={element.id}
          boundBoxFunc={(oldBox, newBox) => {
            return newBox;
          }}
          onTransformEnd={(e) => {
            const node = e.target;
            updateElements({
              ...element,
              x: node.x(),
              y: node.y(),
              width: node.width() * node.scaleX(),
              height: node.height() * node.scaleY(),
              rotation: node.rotation()
            });
          }}
        />
      ))}
    </>
  );
};
