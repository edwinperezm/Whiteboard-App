import React from "react";
import { observer } from "mobx-react-lite";
import { Canvas } from "../Canvas/CanvasRenderer";
import { useAppStore } from "../../store/AppStore";

export const Workspace: React.FC = observer(() => {
  const store = useAppStore();
  const workspaceRef = React.useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey && workspaceRef.current) {
      e.preventDefault();
      
      // Get cursor position relative to the workspace
      const rect = workspaceRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / store.zoom;
      const y = (e.clientY - rect.top) / store.zoom;
      
      // Calculate new zoom
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newZoom = store.zoom * delta;
      
      // Update zoom while maintaining cursor position
      store.setZoom(newZoom, { x, y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    store.handleMouseMove(e.nativeEvent);
  };

  return (
    <div
      ref={workspaceRef}
      className="workspace"
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
    >
      <Canvas />
      <div className="workspace-overlay">
        {/* Overlay elements like selection box, guides, etc. */}
      </div>
    </div>
  );
});
