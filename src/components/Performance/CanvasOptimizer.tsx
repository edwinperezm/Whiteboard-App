import React, { useCallback } from 'react';
import { useAppStore } from '../../store/AppStore';

export const CanvasOptimizer = () => {
  const { elements, visibleArea } = useAppStore();
  
  const getVisibleElements = useCallback(() => 
    elements.filter(el => 
      el.x < visibleArea.right && 
      el.x + el.width > visibleArea.left && 
      el.y < visibleArea.bottom && 
      el.y + el.height > visibleArea.top
    ), [elements, visibleArea]);

  return <>{getVisibleElements().map(el => /* render element */)}</>;
};
