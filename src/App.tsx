import React from 'react';
import CanvasRenderer from './components/Canvas/CanvasRenderer';
import Tools from './components/DrawingTools/Tools';
import LayersList from './components/LayersList/LayersList';
import StatusBar from './components/StatusBar/Status';
import TopBar from './components/TopBar/TopBar';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <TopBar />
      <Tools />
      <CanvasRenderer />
      <LayersList />
      <StatusBar />
    </div>
  );
};

export default App;