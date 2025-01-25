import React from 'react';
import { Canvas } from './components/Canvas/CanvasRenderer';
import { LayersList } from './components/LayersList/LayersList';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <div className="workspace">
        <Canvas />
      <LayersList />
    </div>
    </div>
  );
};

export default App;