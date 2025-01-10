import React from "react";
import {
  Visibility,
  VisibilityOff,
  Lock,
  LockOpen,
  DragHandle,
} from "@mui/icons-material";

const LayersPanel = ({ elements, onElementUpdate, onReorder }) => {
  const handleVisibilityToggle = (id) => {
    onElementUpdate(id, {
      isVisible: !elements.find((e) => e.id === id).isVisible,
    });
  };

  const handleLockToggle = (id) => {
    onElementUpdate(id, {
      isLocked: !elements.find((e) => e.id === id).isLocked,
    });
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDrop = (e, dropIndex) => {
    const dragIndex = Number(e.dataTransfer.getData("text/plain"));
    onReorder(dragIndex, dropIndex);
  };

  return (
    <div className="layers-panel">
      <h3>Layers</h3>
      <div className="layers-list">
        {elements.map((element, index) => (
          <div
            key={element.id}
            className="layer-item"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, index)}
          >
            <DragHandle className="drag-handle" />

            <div className="layer-info">
              <span>{element.type}</span>
              {element.name && (
                <span className="layer-name">{element.name}</span>
              )}
            </div>

            <div className="layer-controls">
              <button
                onClick={() => handleVisibilityToggle(element.id)}
                title={element.isVisible ? "Hide" : "Show"}
              >
                {element.isVisible ? <Visibility /> : <VisibilityOff />}
              </button>

              <button
                onClick={() => handleLockToggle(element.id)}
                title={element.isLocked ? "Unlock" : "Lock"}
              >
                {element.isLocked ? <Lock /> : <LockOpen />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayersPanel;
