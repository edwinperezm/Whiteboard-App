import React from 'react';
import { useAppStore } from '../../store/AppStore';

export const ActionBar = () => {
  const { undo, redo, deleteSelected, duplicateSelected } = useAppStore();
  
  return (
    <div className="action-bar">
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
      <div className="divider" />
      <button onClick={deleteSelected}>Delete</button>
      <button onClick={duplicateSelected}>Duplicate</button>
    </div>
  );
};
