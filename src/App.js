import React from 'react';
import { Canvas } from './components/Canvas/CanvasRenderer.tsx';
import { AppProvider } from './components/contexts/AppContext';
// import { useAppStore } from './store/AppStore.ts';
import './App.css';

function App() {
  return (
    <AppProvider>
      <div className="app">
        <Canvas />
      </div>
    </AppProvider>
  );
}

export default App;
