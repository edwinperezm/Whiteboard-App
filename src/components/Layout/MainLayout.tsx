import React from 'react';
import { TopBar } from './TopBar';
import { Canvas } from '../Canvas';
import { ToolBar } from './ToolBar';
import { RightPanel } from './RightPanel';

export const MainLayout = () => {
  return (
    <div className="main-layout">
      <TopBar />
      <div className="workspace">
        <ToolBar />
        <Canvas />
        <RightPanel />
      </div>
    </div>
  );
};
