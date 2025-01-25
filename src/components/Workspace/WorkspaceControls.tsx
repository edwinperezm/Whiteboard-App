import React from "react";
import { ZoomControls } from "../ZoomControls/ZoomControls";
import { AlignmentTools } from "../Alignment/AlignmentTools";
import { ColorPanel } from "../ColorPicker/ColorPanel";

export const WorkspaceControls: React.FC = () => {
  return (
    <div className="workspace-controls">
      <ZoomControls />
      <AlignmentTools />
      <ColorPanel />
    </div>
  );
};
