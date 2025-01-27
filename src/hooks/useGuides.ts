import { useState, useEffect } from "react";
import { useAppStore } from "../store/AppStore";
import { Element, Guide } from "../core/types";

export const useGuides = () => {
  const store = useAppStore();

  const getGuides = (): Guide[] => {
    const verticalGuides = store.elements
      .filter((el) => el.id !== store.selectedElement?.id)
      .map((el) => ({
        position: el.position.x,
        orientation: 'vertical' as const,
      }));

    const horizontalGuides = store.elements
      .filter((el) => el.id !== store.selectedElement?.id)
      .map((el) => ({
        position: el.position.y,
        orientation: 'horizontal' as const,
      }));

    return [...verticalGuides, ...horizontalGuides];
  };

  return { getGuides };
};
