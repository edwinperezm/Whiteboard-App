import React from "react";
import { observer } from "mobx-react-lite";
import { useAppStore } from "../../store/AppStore";
import { ColorPicker } from "../ColorPicker/ColorPanel";
import { TextTools } from "../TextEditor/TextTools";
import { ElementType } from "../../core/types";

export const PropertyEditor: React.FC = observer(() => {
  const store = useAppStore();

  if (!store.selectedElement) return null;

  const updateProperty = (key: string, value: any) => {
    if (!store.selectedElement) return;
    
    store.updateElement({
      ...store.selectedElement,
      properties: {
        ...store.selectedElement.properties,
        [key]: value,
      },
    });
  };

  return (
    <div className="property-editor">
      <h3>Properties</h3>
      <div className="properties">
        <div className="property-group">
          <label>Position</label>
          <input
            type="number"
            value={store.selectedElement.position.x}
            onChange={(e) => updateProperty("x", Number(e.target.value))}
          />
          <input
            type="number"
            value={store.selectedElement.position.y}
            onChange={(e) => updateProperty("y", Number(e.target.value))}
          />
        </div>
        <ColorPicker />
        {store.selectedElement.type === ElementType.TEXT && <TextTools />}
      </div>
    </div>
  );
});
