import React from 'react';
import { useAppStore } from '../../store/AppStore';

export const ColorPanel = () => {
  const { selectedColor, setColor } = useAppStore();
  
  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF'
  ];
  
  return (
    <div className="color-panel">
      <div className="color-grid">
        {colors.map(color => (
          <button
            key={color}
            className={`color-swatch ${selectedColor === color ? 'active' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => setColor(color)}
          />
        ))}
      </div>
      <input
        type="color"
        value={selectedColor}
        onChange={e => setColor(e.target.value)}
      />
    </div>
  );
};
