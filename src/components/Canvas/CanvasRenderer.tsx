import React from "react";
import { Stage, Layer } from "react-konva";
import { observer } from "mobx-react-lite";
import { useAppStore } from "../../store/AppStore";
import { Elements } from "./Element";
import { SelectionBox } from "../Selection/SelectionBox";
import { GridLayer } from "../Grid/GridLayer";
import { SnapGuides } from "../Guides/SnapGuides";

interface CanvasProps {
  width?: number;
  height?: number;
}

export const Canvas: React.FC<CanvasProps> = observer(({ width = window.innerWidth, height = window.innerHeight }) => {
  const store = useAppStore();

  return (
    <div className="canvas-container">
      <Stage
        width={width}
        height={height}
        scaleX={store.zoom}
        scaleY={store.zoom}
        x={store.pan.x}
        y={store.pan.y}
        onMouseDown={(e) => {
          // Prevent default selection behavior
          e.evt.preventDefault();
          const stage = e.target.getStage();
          if (stage) {
            const point = stage.getPointerPosition();
            if (point) {
              store.handleMouseDown({
                clientX: point.x,
                clientY: point.y,
                preventDefault: () => {},
              } as unknown as MouseEvent);
            }
          }
        }}
        onMouseMove={(e) => {
          const stage = e.target.getStage();
          if (stage) {
            const point = stage.getPointerPosition();
            if (point) {
              store.handleMouseMove({
                clientX: point.x,
                clientY: point.y,
                preventDefault: () => {},
              } as unknown as MouseEvent);
            }
          }
        }}
        onMouseUp={() => store.handleMouseUp({} as MouseEvent)}
      >
        <Layer>
          <GridLayer />
          <Elements />
          {store.selectedElement && <SelectionBox />}
          <SnapGuides />
        </Layer>
      </Stage>
    </div>
  );
});
