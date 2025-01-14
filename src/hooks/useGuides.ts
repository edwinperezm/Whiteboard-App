import { useState, useEffect } from 'react';
import { useAppStore } from '../store/AppStore';

export const useGuides = () => {
  const { elements, selectedElement } = useAppStore();
  const [guides, setGuides] = useState([]);

  const calculateGuides = () => {
    if (!selectedElement) return [];
    
    return elements
      .filter(el => el.id !== selectedElement.id)
      .map(el => ({
        x: el.x,
        y: el.y,
        width: el.width,
        height: el.height
      }));
  };

  useEffect(() => {
    setGuides(calculateGuides());
  }, [selectedElement, elements]);

  return { guides };
};
