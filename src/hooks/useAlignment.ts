import { useCallback } from "react";
import { useAppStore } from "../store/AppStore";
import { Element } from "../core/types";

interface Bounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

type Alignment = "left" | "right" | "top" | "bottom";

export const useAlignment = () => {
  const store = useAppStore();

  const alignElements = useCallback(
    (alignment: Alignment) => {
      if (store.selectedElements.length < 2) return;

      const bounds = store.selectedElements.reduce<Bounds>(
        (acc, el) => {
          const x = el.position.x;
          const y = el.position.y;
          const width = el.properties.width || 0;
          const height = el.properties.height || 0;

          return {
            left: Math.min(acc.left, x),
            right: Math.max(acc.right, x + width),
            top: Math.min(acc.top, y),
            bottom: Math.max(acc.bottom, y + height),
          };
        },
        { left: Infinity, right: -Infinity, top: Infinity, bottom: -Infinity },
      );

      const alignedElements = store.selectedElements.map((el) => {
        const width = el.properties.width || 0;
        const height = el.properties.height || 0;

        switch (alignment) {
          case "left":
            return { ...el, position: { ...el.position, x: bounds.left } };
          case "right":
            return {
              ...el,
              position: { ...el.position, x: bounds.right - width },
            };
          case "top":
            return { ...el, position: { ...el.position, y: bounds.top } };
          case "bottom":
            return {
              ...el,
              position: { ...el.position, y: bounds.bottom - height },
            };
          default:
            return el;
        }
      });

      store.updateElements(alignedElements);
    },
    [store],
  );

  return { alignElements };
};
