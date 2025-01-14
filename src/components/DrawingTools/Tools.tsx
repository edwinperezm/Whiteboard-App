import React from 'react';
import { TOOLS } from '../../config/toolConfig';
import { useAppStore } from '../../store/AppStore';

export const Tools = () => {
  const { selectedTool, updateTool } = useAppStore();

  return (
    <div className="drawing-tools">
      {Object.values(TOOLS).map(tool => (
        <button
          key={tool.id}
          className={`tool ${selectedTool === tool.id ? 'active' : ''}`}
          onClick={() => updateTool(tool.id)}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  );
};
