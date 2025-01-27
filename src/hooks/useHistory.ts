import { useCallback } from "react";
import { useAppStore } from "../store/AppStore";
import { Element } from "../core/types";

export const useHistory = () => {
  const store = useAppStore();

  const updateState = useCallback(
    (elements: Element[]) => {
      store.elements = [...elements];
      store.history = store.history.slice(0, store.currentIndex + 1);
      store.history.push([...elements]);
      store.currentIndex++;
    },
    [store],
  );

  return {
    history: store.history,
    currentIndex: store.currentIndex,
    updateState,
  };
};
