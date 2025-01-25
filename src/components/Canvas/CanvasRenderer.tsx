import React from "react";
import { Stage, Layer } from "react-konva";
import { observer } from "mobx-react-lite";
import { useAppStore } from "../../store/AppStore";
import { Elements } from "./Element";
import { SelectionBox } from "../Selection/SelectionBox";
import { GridLayer } from "../Grid/GridLayer";
import { SnapGuides } from "../Guides/SnapGuides";

export const Canvas: React.FC = observer(() => {
  const store = useAppStore();

  const handleWheel = (e: any) => {
    e.evt.preventDefault();
    const scaleBy = 1.1;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const pointerPos = stage.getPointerPosition();

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    store.setZoom(newScale);
  };

  return (
    <div className="canvas-container" data-testid="canvas">
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        scaleX={store.zoom}
        scaleY={store.zoom}
        x={store.pan.x}
        y={store.pan.y}
        onWheel={handleWheel}
      >
        <GridLayer />
        <Layer>
          <Elements />
          <SelectionBox />
          <SnapGuides />
        </Layer>
      </Stage>
    </div>
  );
});
