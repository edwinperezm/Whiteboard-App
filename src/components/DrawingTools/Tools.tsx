import React from 'react';
import { TOOLS } from '../../config/toolConfig';
import { useAppStore } from '../../store/AppStore';
import { ElementType } from '../../core/types';

export const Tools: React.FC = () => {
  const store = useAppStore();
  const selectedTool = store.selectedTool;

  return (
    <div className="drawing-tools">
      {Object.values(TOOLS).map((tool) => (
        <button
          key={tool.id}
          className={`tool-button ${selectedTool === tool.id ? 'active' : ''}`}
          onClick={() => store.setSelectedTool(tool.id)}
          title={`${tool.name} (${tool.shortcut})`}
        >
          <tool.icon sx={{ fontSize: 24 }} />
        </button>
      ))}
    </div>
  );
};
