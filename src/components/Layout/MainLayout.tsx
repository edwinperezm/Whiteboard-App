import React from "react";
import { observer } from "mobx-react-lite";
import { TopBar } from "./TopBar";
import { ToolBar } from "../ToolBar/ToolBar";
import { Canvas } from "../Canvas/CanvasRenderer";
import { RightPanel } from "../RightPanel/RightPanel";
import { StatusBar } from "../StatusBar/Status";
import { CollaborativeCursors } from "../CollaborativeCursors/Cursors";

export const MainLayout: React.FC = observer(() => {
  return (
    <div className="main-layout">
      <TopBar />
      <div className="workspace">
        <ToolBar />
        <div className="canvas-area">
          <Canvas />
          <CollaborativeCursors />
        </div>
        <RightPanel />
      </div>
      <StatusBar />
    </div>
  );
});
