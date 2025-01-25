import React from "react";
import { useAppStore } from "../../store/AppStore";

export const TransformControls: React.FC = () => {
  const { selectedElement, updateElement } = useAppStore();

  if (!selectedElement) return null;

  return (
    <div className="transform-controls">
      <div className="control-group">
        <label>Position</label>
        <input
          type="number"
          value={selectedElement.position.x}
          onChange={(e) =>
            updateElement({
              ...selectedElement,
              position: {
                ...selectedElement.position,
                x: Number(e.target.value),
              },
            })
          }
        />
        <input
          type="number"
          value={selectedElement.position.y}
          onChange={(e) =>
            updateElement({
              ...selectedElement,
              position: {
                ...selectedElement.position,
                y: Number(e.target.value),
              },
            })
          }
        />
      </div>
      <div className="control-group">
        <label>Rotation</label>
        <input
          type="number"
          value={selectedElement.properties.rotation || 0}
          onChange={(e) =>
            updateElement({
              ...selectedElement,
              properties: {
                ...selectedElement.properties,
                rotation: Number(e.target.value),
              },
            })
          }
        />
      </div>
    </div>
  );
};
