import React from 'react';
import { Layer, Line } from 'react-konva';

export const GridLayer = ({ width, height, spacing = 20 }) => {
  const lines = [];
  
  for (let i = 0; i < width; i += spacing) {
    lines.push(
      <Line 
        points={[i, 0, i, height]} 
        stroke="#ddd" 
        strokeWidth={0.5} 
      />
    );
  }
  
  for (let i = 0; i < height; i += spacing) {
    lines.push(
      <Line 
        points={[0, i, width, i]} 
        stroke="#ddd" 
        strokeWidth={0.5} 
      />
    );
  }

  return <Layer>{lines}</Layer>;
};
