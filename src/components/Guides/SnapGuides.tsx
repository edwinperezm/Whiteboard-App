import React from 'react';
import { Line } from 'react-konva';
import { useAppStore } from '../../store/AppStore';

export const SnapGuides = () => {
  const { snapLines } = useAppStore();
  
  return (
    <>
      {snapLines.map((line, i) => (
        <Line
          key={i}
          points={line.points}
          stroke="#00F"
          strokeWidth={1}
          dash={[4, 4]}
        />
      ))}
    </>
  );
};
