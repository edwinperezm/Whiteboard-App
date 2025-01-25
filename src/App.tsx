import React from "react";
import { Canvas } from "./components/Canvas/CanvasRenderer";
import { AppProvider } from "./contexts/AppContext"; // Updated import path
import "./App.css";

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
