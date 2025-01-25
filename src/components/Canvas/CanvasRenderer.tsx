import React, { createContext, useContext, ReactNode } from 'react';
import { Stage as KonvaStage, Layer } from 'react-konva';
import { create } from 'zustand';
import { Elements } from './Element';
import { CanvasEvents } from './CanvasEvents';

const AppContext = createContext(null);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
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
      <KonvaStage 
        width={window.innerWidth} 
        height={window.innerHeight}
        scaleX={zoom}
        scaleY={zoom}
      >
        <Layer>
          <Elements />
          <CanvasEvents />
        </Layer>
      </KonvaStage>
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