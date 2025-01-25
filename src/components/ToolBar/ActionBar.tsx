import React from "react";
import { observer } from "mobx-react-lite";
import { useAppStore } from "../../store/AppStore";

export const ActionBar: React.FC = observer(() => {
  const store = useAppStore();

  const handleDuplicate = () => {
    if (store.selectedElement) {
      const duplicate = {
        ...store.selectedElement,
        id: Date.now().toString(),
        position: {
          x: store.selectedElement.position.x + 10,
          y: store.selectedElement.position.y + 10,
        },
      };
      store.addElement(duplicate);
    }
  };

  return (
    <div className="action-bar">
      <button onClick={() => store.undo()} disabled={store.currentIndex === 0}>
        Undo
      </button>
      <button
        onClick={() => store.redo()}
        disabled={store.currentIndex === store.history.length - 1}
      >
        Redo
      </button>
      <div className="divider" />
      <button
        onClick={() => store.deleteSelected()}
        disabled={!store.selectedElement}
      >
        Delete
      </button>
      <button onClick={handleDuplicate} disabled={!store.selectedElement}>
        Duplicate
      </button>
    </div>
  );
});
