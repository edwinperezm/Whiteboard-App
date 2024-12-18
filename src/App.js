import React, { useState, useEffect } from 'react';
import Canvas from './Canvas';
import LeftToolbar from './components/LeftToolbar';
import TopNavBar from './components/TopNavBar';
import RightPanel from './components/RightPanel';
import './App.css';

function App() {
  const [selectedTool, setSelectedTool] = useState('select');
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const handleKeyboardShortcuts = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
          case 'z':
            e.shiftKey ? handleRedo() : handleUndo();
            break;
          case '+':
            setZoomLevel(prev => Math.min(prev * 1.1, 3));
            break;
          case '-':
            setZoomLevel(prev => Math.max(prev / 1.1, 0.5));
            break;
          case '0':
            setZoomLevel(1);
            break;
          case 'a':
            // Select all elements
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyboardShortcuts);
    return () => window.removeEventListener('keydown', handleKeyboardShortcuts);
  }, []);

  const handleUndo = () => {
    // Implement undo logic
  };

  const handleRedo = () => {
    // Implement redo logic
  };

  return (
    <div className="app-container">
      <TopNavBar />
      <div className="workspace">
        <LeftToolbar 
          selectedTool={selectedTool} 
          onSelectTool={setSelectedTool} 
        />
        <Canvas 
          selectedTool={selectedTool} 
          zoomLevel={zoomLevel}
        />
        <RightPanel />
      </div>
    </div>
  );
}

export default App;