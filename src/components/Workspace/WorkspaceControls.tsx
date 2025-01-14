import React from 'react';
import { ZoomControls } from '../ZoomControls';
import { AlignmentTools } from '../Alignment/AlignmentTools';
import { ColorPanel } from '../ColorPicker/ColorPanel';

export const WorkspaceControls = () => {
  return (
    <div className="workspace-controls">
      <ZoomControls />
      <AlignmentTools />
      <ColorPanel />
    </div>
  );
};
