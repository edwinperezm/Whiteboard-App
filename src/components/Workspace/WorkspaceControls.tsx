import React, { useCallback } from "react";
import { ZoomIn, ZoomOut, CenterFocusStrong } from "@mui/icons-material";
import { useAppStore } from "../../store/AppStore";
import { Tooltip } from "@mui/material";

export const WorkspaceControls: React.FC = () => {
  const store = useAppStore();

  const handleZoomIn = useCallback(() => {
    store.setZoom(Math.min(store.zoom * 1.2, 5));
  }, [store]);

  const handleZoomOut = useCallback(() => {
    store.setZoom(Math.max(store.zoom / 1.2, 0.1));
  }, [store]);

  const handleResetZoom = useCallback(() => {
    store.setZoom(1);
    store.setPan({ x: 0, y: 0 });
  }, [store]);

  return (
    <div className="workspace-controls">
      <Tooltip title="Zoom In (Ctrl +)">
        <button onClick={handleZoomIn}>
          <ZoomIn />
        </button>
      </Tooltip>
      
      <Tooltip title="Reset View">
        <button onClick={handleResetZoom}>
          <CenterFocusStrong />
          <span>{Math.round(store.zoom * 100)}%</span>
        </button>
      </Tooltip>
      
      <Tooltip title="Zoom Out (Ctrl -)">
        <button onClick={handleZoomOut}>
          <ZoomOut />
        </button>
      </Tooltip>
    </div>
  );
};
