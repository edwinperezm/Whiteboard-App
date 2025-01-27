import React from "react";
import { observer } from "mobx-react-lite";
import { useAppStore } from "../../store/AppStore";
import { TOOLS } from "../../config/toolConfig";
import { Tooltip } from "@mui/material";

export const ToolBar: React.FC = observer(() => {
  const store = useAppStore();

  return (
    <div className="toolbar">
      {Object.values(TOOLS).map((tool) => (
        <Tooltip 
          key={tool.id}
          title={`${tool.name} (${tool.shortcut})`}
          placement="right"
        >
          <button
            className={`tool-btn ${store.selectedTool === tool.id ? "active" : ""}`}
            onClick={() => store.setSelectedTool(tool.id)}
          >
            <tool.icon />
          </button>
        </Tooltip>
      ))}
    </div>
  );
});
