import { useCallback } from 'react';
import { useAppStore } from '../store/AppStore';

export const useHistory = () => {
  const { history, currentIndex, updateState } = useAppStore();

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      updateState(history[currentIndex - 1]);
    }
  }, [currentIndex, history]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      updateState(history[currentIndex + 1]);
    }
  }, [currentIndex, history]);

  return { undo, redo };
};
