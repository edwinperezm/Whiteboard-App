import { useState, useCallback } from 'react';
import { useAppStore } from '../store/AppStore';

export const useGestures = () => {
  const [initialDistance, setInitialDistance] = useState(0);
  const { setZoom, setPan } = useAppStore();

  const calculateDistance = (touches: TouchList) => {
    return Math.hypot(
      touches[0].clientX - touches[1].clientX,
      touches[0].clientY - touches[1].clientY
    );
  };

  const handleZoom = useCallback((event: TouchEvent) => {
    if (event.touches.length === 2) {
      const distance = calculateDistance(event.touches);
      const scale = distance / initialDistance;
      setZoom(scale);
    }
  }, [initialDistance]);

  return { handleZoom };
};
