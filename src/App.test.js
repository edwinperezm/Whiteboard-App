import { render, screen } from '@testing-library/react';
import { useState, useEffect, useRef } from 'react';
import { Stage } from 'konva';
import { io } from "socket.io-client";
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';

test('renders main canvas', () => {
  render(<App />);
  const canvasElement = screen.getByTestId('main-canvas');
  expect(canvasElement).toBeInTheDocument();
});

export const socket = io("http://localhost:3001", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000
});

const Canvas = ({ selectedTool, zoomLevel = 1 }) => {
  const [elements, setElements] = useState([]);
  const stageRef = useRef(null);

  useEffect(() => {
    // Add console logs to verify rendering
    console.log('Selected Tool:', selectedTool);
    console.log('Zoom Level:', zoomLevel);
  }, [selectedTool, zoomLevel]);

  return (
    <Stage 
      ref={stageRef}
      width={window.innerWidth} 
      height={window.innerHeight}
      scaleX={zoomLevel}
      scaleY={zoomLevel}
      className="konva-container"
      data-testid="canvas-stage"
    >
      {/* Render logic */}
    </Stage>
  );
};

const AppWithErrorBoundary = () => {
  return (
    <ErrorBoundary>
      {/* Existing App content */}
    </ErrorBoundary>
  );
}

export default Canvas;