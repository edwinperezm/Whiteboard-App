import React, { useRef, useEffect } from 'react';
import { Transformer } from 'react-konva';
import { useAppStore } from '../../store/AppStore';

export const SelectionBox: React.FC = () => {
  const transformerRef = useRef<any>(null);
  const store = useAppStore();
  
  useEffect(() => {
    if (transformerRef.current && store.selectedElement) {
      // Find the node by id using Konva's find method
      const node = transformerRef.current.getStage().findOne(`#${store.selectedElement.id}`);
      if (node) {
        transformerRef.current.nodes([node]);
        transformerRef.current.getLayer()?.batchDraw();
      }
    }
  }, [store.selectedElement]);

  if (!store.selectedElement) return null;

  return (
    <Transformer
      ref={transformerRef}
      boundBoxFunc={(oldBox, newBox) => {
        // Enforce minimum dimensions
        const minWidth = 5;
        const minHeight = 5;
        const newWidth = Math.max(newBox.width, minWidth);
        const newHeight = Math.max(newBox.height, minHeight);
        return {
          ...newBox,
          width: newWidth,
          height: newHeight
        };
      }}
    />
  );
};
