import { useState, useCallback } from "react";
import { useAppStore } from "../store/AppStore";
import { Point } from "../core/types";

export const useGestures = () => {
  const [initialDistance, setInitialDistance] = useState(0);
  const store = useAppStore();

  const calculateDistance = (touches: TouchList) => {
    return Math.hypot(
      touches[0].clientX - touches[1].clientX,
      touches[0].clientY - touches[1].clientY,
    );
  };

  const handleZoom = useCallback(
    (event: TouchEvent) => {
      if (event.touches.length === 2) {
        const distance = calculateDistance(event.touches);
        const scale = distance / initialDistance;
        store.setZoom(scale);
      }
    },
    [initialDistance, store],
  );

  const handlePan = useCallback(
    (dx: number, dy: number) => {
      const newPan: Point = {
        x: store.pan.x + dx,
        y: store.pan.y + dy,
      };
      store.setPan(newPan);
    },
    [store],
  );

  return { handleZoom, handlePan };
};
