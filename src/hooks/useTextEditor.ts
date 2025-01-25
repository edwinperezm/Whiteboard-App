import { useState, useEffect } from "react";
import { useAppStore } from "../store/AppStore";

export const useTextEditor = () => {
  const store = useAppStore();
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = () => {
    if (store.selectedElement?.type === "text") {
      setIsEditing(true);
    }
  };

  const stopEditing = (text: string) => {
    if (store.selectedElement) {
      store.updateElement({
        ...store.selectedElement,
        properties: { ...store.selectedElement.properties, text },
      });
    }
    setIsEditing(false);
  };

  return { isEditing, startEditing, stopEditing };
};
