import { useEffect, useCallback } from "react";
import { useAppStore } from "../store/AppStore";
import { ElementType } from "../core/types";
import { TOOLS } from "../config/toolConfig";

export const useShortcuts = () => {
  const store = useAppStore();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't trigger shortcuts when typing in input fields
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return;
    }

    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case "z":
          if (e.shiftKey) {
            e.preventDefault();
            store.redo();
          } else {
            e.preventDefault();
            store.undo();
          }
          break;
        case "c":
          if (store.selectedElement) {
            e.preventDefault();
            store.copySelected();
          }
          break;
        case "v":
          e.preventDefault();
          store.paste();
          break;
        case "=":
        case "+":
          e.preventDefault();
          store.setZoom(Math.min(store.zoom * 1.2, 5));
          break;
        case "-":
          e.preventDefault();
          store.setZoom(Math.max(store.zoom / 1.2, 0.1));
          break;
        case "0":
          e.preventDefault();
          store.setZoom(1);
          store.setPan({ x: 0, y: 0 });
          break;
      }
    } else {
      // Tool shortcuts
      Object.values(TOOLS).forEach(tool => {
        if (e.key.toLowerCase() === tool.shortcut.toLowerCase()) {
          store.setSelectedTool(tool.id);
        }
      });

      if (e.key === "Delete" || e.key === "Backspace") {
        store.deleteSelected();
      }
    }
  }, [store]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
};
