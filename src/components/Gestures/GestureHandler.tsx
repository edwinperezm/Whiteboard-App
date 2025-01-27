import React, { useCallback, useState } from 'react';
import { useAppStore } from '../../store/AppStore';

export const GestureHandler: React.FC = () => {
  const store = useAppStore();
  const [initialDistance, setInitialDistance] = useState<number | null>(null);
  const [initialZoom, setInitialZoom] = useState<number>(1);

  const getDistance = (touches: React.TouchList): number => {
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY
    );
  };

  const handleTouchStart = (e: React.TouchEvent): void => {
    if (e.touches.length === 2) {
      setInitialDistance(getDistance(e.touches));
      setInitialZoom(store.zoom);
    }
  };

  const handleTouchMove = useCallback((e: React.TouchEvent): void => {
    if (e.touches.length === 2 && initialDistance !== null) {
      const newDistance = getDistance(e.touches);
      const scale = newDistance / initialDistance;
      const newZoom = Math.min(Math.max(initialZoom * scale, 0.1), 5);
      store.setZoom(newZoom);
    } else if (e.touches.length === 1) {
      const touch = e.touches[0];
      const dx = touch.clientX - touch.clientX;
      const dy = touch.clientY - touch.clientY;
      store.setPan({
        x: store.pan.x + dx,
        y: store.pan.y + dy
      });
    }
  }, [initialDistance, initialZoom, store]);

  return (
    <div 
      className="gesture-handler"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setInitialDistance(null)}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        touchAction: 'none',
        zIndex: 1
      }}
    />
  );
};
