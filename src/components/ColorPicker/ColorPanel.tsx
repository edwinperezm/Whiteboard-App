import React from "react";
import { observer } from "mobx-react-lite";
import { useAppStore } from "../../store/AppStore";

export const ColorPicker: React.FC = observer(() => {
  const store = useAppStore();

  const colors = [
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFFFFF",
  ];

  return (
    <div className="color-picker">
      <div className="color-grid">
        {colors.map((color) => (
          <button
            key={color}
            className={`color-swatch ${store.selectedColor === color ? "active" : ""}`}
            style={{ backgroundColor: color }}
            onClick={() => store.setColor(color)}
          />
        ))}
      </div>
      <input
        type="color"
        value={store.selectedColor}
        onChange={(e) => store.setColor(e.target.value)}
      />
    </div>
  );
});
