import React from "react";
import { observer } from "mobx-react-lite";
import { useAppStore } from "../../store/AppStore";
import { ElementType } from "../../core/types";
import { TOOLS } from "../../config/toolConfig";

export const ToolBar: React.FC = observer(() => {
  const store = useAppStore();

  return (
    <div className="toolbar">
      {Object.values(TOOLS).map((tool) => (
        <button
          key={tool.id}
          className={`tool-btn ${store.selectedTool === tool.id ? "active" : ""}`}
          onClick={() => store.setSelectedTool(tool.id as ElementType)}
          title={tool.name}
        >
          <tool.icon />
          <span className="tool-shortcut">{tool.shortcut}</span>
        </button>
      ))}
    </div>
  );
});
