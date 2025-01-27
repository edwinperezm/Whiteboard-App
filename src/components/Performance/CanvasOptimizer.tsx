import React, { useCallback } from 'react';
import { useAppStore } from '../../store/AppStore';
import { Element } from '../../core/types';

export const CanvasOptimizer: React.FC = () => {
  const { elements, visibleArea } = useAppStore();
  
  const getVisibleElements = useCallback(() => 
    elements.filter((el: Element) => 
      el.position.x < visibleArea.right && 
      el.position.x + (el.properties.width || 0) > visibleArea.left && 
      el.position.y < visibleArea.bottom && 
      el.position.y + (el.properties.height || 0) > visibleArea.top
    ), [elements, visibleArea]);

  return (
    <>
      {getVisibleElements().map(el => (
        <div key={el.id}>{/* render element */}</div>
      ))}
    </>
  );
};
