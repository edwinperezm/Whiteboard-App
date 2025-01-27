import React from "react";
import { useAppStore } from "../../store/AppStore";
import { ElementType } from "../../core/types";

interface TextProperties {
  fontSize?: number;
  fontFamily?: string;
  bold?: boolean;
  italic?: boolean;
}

export const TextTools: React.FC = () => {
  const store = useAppStore();
  const selectedElement = store.selectedElement;

  if (!selectedElement || selectedElement.type !== ElementType.TEXT) {
    return null;
  }

  const updateTextProperty = (property: keyof TextProperties, value: any) => {
    if (!selectedElement) return;

    store.updateElement({
      ...selectedElement,
      properties: {
        ...selectedElement.properties,
        [property]: value,
      },
    });
  };

  const textProps = selectedElement.properties as TextProperties;

  return (
    <div className="text-tools">
      <input
        type="number"
        value={textProps.fontSize || 16}
        onChange={(e) => updateTextProperty("fontSize", Number(e.target.value))}
        min={8}
        max={72}
      />
      <select
        value={textProps.fontFamily || "Arial"}
        onChange={(e) => updateTextProperty("fontFamily", e.target.value)}
      >
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
      </select>
      <button
        className={textProps.bold ? "active" : ""}
        onClick={() => updateTextProperty("bold", !textProps.bold)}
      >
        B
      </button>
      <button
        className={textProps.italic ? "active" : ""}
        onClick={() => updateTextProperty("italic", !textProps.italic)}
      >
        I
      </button>
    </div>
  );
};
