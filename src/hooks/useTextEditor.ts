import { useState, useEffect } from 'react';
import { useAppStore } from '../store/AppStore';

export const useTextEditor = () => {
  const { selectedElement, updateElement } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = () => {
    if (selectedElement?.type === 'text') {
      setIsEditing(true);
    }
  };

  const stopEditing = (text: string) => {
    updateElement({ ...selectedElement, text });
    setIsEditing(false);
  };

  return { isEditing, startEditing, stopEditing };
};
