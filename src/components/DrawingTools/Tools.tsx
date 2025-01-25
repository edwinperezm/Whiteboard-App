import React from 'react';
import { TOOLS } from '../../config/toolConfig';
import { useAppStore } from '../../store/AppStore';

export const Tools = () => {
  const { selectedTool, updateTool } = useAppStore();

  return (
    <div className="tools-container">
      {/* Drawing tools will go here */}
    </div>
  );
};
