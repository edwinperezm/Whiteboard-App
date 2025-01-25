import React from "react";
import { Layer, Line } from "react-konva";
import { observer } from "mobx-react-lite";
import { useAppStore } from "../../store/AppStore";

export const GridLayer: React.FC = observer(() => {
  const store = useAppStore();
  const spacing = 20;
  const gridColor = "#ddd";

  const createGridLines = () => {
    const lines = [];
    const width = window.innerWidth / store.zoom;
    const height = window.innerHeight / store.zoom;

    // Vertical lines
    for (let i = 0; i < width; i += spacing) {
      lines.push(
        <Line
          key={`v${i}`}
          points={[i, 0, i, height]}
          stroke={gridColor}
          strokeWidth={0.5 / store.zoom}
        />,
      );
    }

    // Horizontal lines
    for (let i = 0; i < height; i += spacing) {
      lines.push(
        <Line
          key={`h${i}`}
          points={[0, i, width, i]}
          stroke={gridColor}
          strokeWidth={0.5 / store.zoom}
        />,
      );
    }

    return lines;
  };

  return <Layer>{createGridLines()}</Layer>;
});
