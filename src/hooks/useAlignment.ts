import { useCallback } from 'react';
import { useAppStore } from '../store/AppStore';

export const useAlignment = () => {
  const { selectedElements, updateElements } = useAppStore();

  const alignElements = useCallback((alignment: string) => {
    if (selectedElements.length < 2) return;

    const bounds = selectedElements.reduce((acc, el) => ({
      left: Math.min(acc.left, el.x),
      right: Math.max(acc.right, el.x + el.width),
      top: Math.min(acc.top, el.y),
      bottom: Math.max(acc.bottom, el.y + el.height)
    }));

    const alignedElements = selectedElements.map(el => {
      switch(alignment) {
        case 'left': return { ...el, x: bounds.left };
        case 'right': return { ...el, x: bounds.right - el.width };
        case 'top': return { ...el, y: bounds.top };
        case 'bottom': return { ...el, y: bounds.bottom - el.height };
      }
    });

    updateElements(alignedElements);
  }, [selectedElements]);

  return { alignElements };
};
