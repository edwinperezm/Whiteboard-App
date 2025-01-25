import { useState, useEffect } from "react";
import { useAppStore } from "../store/AppStore";
import { Element, Guide } from "../core/types";

export const useGuides = () => {
  const store = useAppStore();
  const [guides, setGuides] = useState<Guide[]>([]);

  const calculateGuides = (): Guide[] => {
    if (!store.selectedElement || !store.elements.length) return [];

    return store.elements
      .filter((el) => el.id !== store.selectedElement?.id)
      .map((el) => ({
        x: el.position.x,
        y: el.position.y,
        width: el.properties.width || 0,
        height: el.properties.height || 0,
      }));
  };

  useEffect(() => {
    setGuides(calculateGuides());
  }, [store.selectedElement, store.elements]);

  return { guides };
};
