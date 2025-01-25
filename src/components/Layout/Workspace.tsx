import React from "react";
import { observer } from "mobx-react-lite";
import { Canvas } from "../Canvas/CanvasRenderer";
import { useAppStore } from "../../store/AppStore";

export const Workspace: React.FC = observer(() => {
  const store = useAppStore();

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      store.setZoom(store.zoom + delta);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    store.handleMouseMove(e.nativeEvent);
  };

  return (
    <div
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
