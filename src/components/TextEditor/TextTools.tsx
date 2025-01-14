import React from 'react';
import { useAppStore } from '../../store/AppStore';

export const TextTools = () => {
  const { selectedElement, updateElement } = useAppStore((state) => ({
    selectedElement: state.selectedElement,
    updateElement: state.updateElement
  }));
  
  return (
    <div className="text-tools">
      <select onChange={e => updateElement({ fontFamily: e.target.value })}>
        <option value="Arial">Arial</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Times">Times</option>
      </select>
      <input type="number" min="8" max="72" onChange={e => updateElement({ fontSize: e.target.value })} />
      <button onClick={() => updateElement({ bold: !selectedElement.bold })}>B</button>
      <button onClick={() => updateElement({ italic: !selectedElement.italic })}>I</button>
    </div>
  );
};