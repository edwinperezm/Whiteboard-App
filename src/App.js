import React from 'react';
import { Canvas } from './components/Canvas/CanvasRenderer';
import { Tools } from './components/DrawingTools/Tools';
import { LayersList } from './components/LayersList/LayersList';
import { StatusBar } from './components/StatusBar/Status';
import { TopBar } from './components/TopBar/TopBar';
import './App.css';

function App() {
  return (
    <div className="app">
      <TopBar />
      <div className="workspace">
        <Tools />
        <Canvas />
        <LayersList />
      </div>
      <StatusBar />
    </div>
  );
}

export default App;
