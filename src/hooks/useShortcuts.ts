import { useEffect } from 'react';
import { useAppStore } from '../store/AppStore';

export const useShortcuts = () => {
  const { undo, redo, deleteSelected } = useAppStore();

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z') undo();
        if (e.key === 'y') redo();
      }
      if (e.key === 'Delete') deleteSelected();
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, []);
};
