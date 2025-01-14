import React from 'react';
import { Stage, Layer } from 'react-konva';
import { useAppStore } from '../../store/AppStore';

export const Canvas: React.FC = () => {
  const { zoom } = useAppStore();
  return (
    <div className="canvas-container" data-testid="canvas">
      <Stage 
        width={window.innerWidth} 
        height={window.innerHeight}
        scaleX={zoom}
        scaleY={zoom}
      >
        <Layer />
      </Stage>
    </div>
  );
};

export default Canvas;