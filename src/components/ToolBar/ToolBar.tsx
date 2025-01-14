import React from 'react';
import { useAppStore } from '../../store/AppStore';
import { TOOLS } from '../../config/toolConfig';

export const ToolBar = () => {
  const { selectedTool, updateTool } = useAppStore();

  return (
    <div className="toolbar">
      {Object.values(TOOLS).map(tool => (
        <button
          key={tool.id}
          className={`tool-btn ${selectedTool === tool.id ? 'active' : ''}`}
          onClick={() => updateTool(tool.id)}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  );
};
