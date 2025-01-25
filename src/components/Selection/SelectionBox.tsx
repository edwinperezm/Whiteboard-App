import React from "react";
import { Rect, Transformer } from "react-konva";
import { observer } from "mobx-react-lite";
import { useAppStore } from "../../store/AppStore";

export const SelectionBox: React.FC = observer(() => {
  const store = useAppStore();

  if (!store.selectedElement) return null;

  return (
    <Transformer
      node={null} // Will be set by Konva
      enabledAnchors={["top-left", "top-right", "bottom-left", "bottom-right"]}
      boundBoxFunc={(oldBox, newBox) => {
        // Limit resize if needed
        return newBox;
      }}
      onTransformEnd={(e) => {
        const node = e.target;
        store.updateElement({
          ...store.selectedElement!,
          properties: {
            ...store.selectedElement!.properties,
            width: node.width() * node.scaleX(),
            height: node.height() * node.scaleY(),
            rotation: node.rotation(),
          },
        });
      }}
    />
  );
});
