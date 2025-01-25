import React from "react";
import { observer } from "mobx-react-lite";
import { useAppStore } from "../../store/AppStore";

export const TextTools: React.FC = observer(() => {
  const store = useAppStore();

  if (
    !store.selectedElement ||
    store.selectedElement.type !== ElementType.TEXT
  ) {
    return null;
  }

  const updateTextProperty = (key: string, value: any) => {
    store.updateElement({
      ...store.selectedElement!,
      properties: {
        ...store.selectedElement!.properties,
        [key]: value,
      },
    });
  };

  return (
    <div className="text-tools">
      <select
        value={store.selectedElement.properties.fontFamily || "Arial"}
        onChange={(e) => updateTextProperty("fontFamily", e.target.value)}
      >
        <option value="Arial">Arial</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Times">Times</option>
      </select>
      <input
        type="number"
        min="8"
        max="72"
        value={store.selectedElement.properties.fontSize || 16}
        onChange={(e) => updateTextProperty("fontSize", Number(e.target.value))}
      />
      <button
        className={store.selectedElement.properties.bold ? "active" : ""}
        onClick={() =>
          updateTextProperty("bold", !store.selectedElement!.properties.bold)
        }
      >
        B
      </button>
      <button
        className={store.selectedElement.properties.italic ? "active" : ""}
        onClick={() =>
          updateTextProperty(
            "italic",
            !store.selectedElement!.properties.italic,
          )
        }
      >
        I
      </button>
    </div>
  );
});
