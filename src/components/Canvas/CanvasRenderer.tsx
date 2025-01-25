import React, { createContext, useContext } from 'react';
import { Stage, Layer } from 'react-konva';
import { create } from 'zustand';
import { useAppStore } from '../../store/AppStore';
import { Elements } from './Element';
import { CanvasEvents } from './CanvasEvents';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const store = useAppStore();
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);

interface AppState {
  selectedTool: string;
  elements: any[];
}

export const useAppStore = create<AppState>(() => ({
  selectedTool: 'select',
  elements: []
}));

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
        <Layer>
          <Elements />
          <CanvasEvents />
        </Layer>
      </Stage>
    </div>
  );
};

export const Tools = () => {
  return (
    <div className="tools-container">
      {/* Drawing tools will go here */}
    </div>
  );
};

export const StatusBar = () => {
  return (
    <div className="status-bar">
      {/* Status information will go here */}
    </div>
  );
};

export const TopBar = () => {
  return (
    <div className="top-bar">
      {/* Navigation and actions will go here */}
    </div>
  );
};

export default Canvas;