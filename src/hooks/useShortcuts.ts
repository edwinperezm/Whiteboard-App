import { useEffect } from "react";
import { useAppStore } from "../store/AppStore";

export const useShortcuts = () => {
  const store = useAppStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case "z":
            if (e.shiftKey) {
              store.redo();
            } else {
              store.undo();
            }
            break;
          case "y":
            store.redo();
            break;
        }
      } else if (e.key === "Delete" || e.key === "Backspace") {
        store.deleteSelected();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [store]);
};
