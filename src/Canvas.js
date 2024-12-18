import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Stage, Layer, Rect, Circle, Line, Text, Transformer } from "react-konva";
import { socket } from "./api";

// Add missing utility functions
const getRandomColor = () => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', 
    '#FDCB6E', '#6C5CE7', '#A8E6CF', '#FF8ED4'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Placeholder functions for advanced drawing
const isCircle = (points, tolerance) => {
  // Implement circle detection logic
  return false;
};

const isRectangle = (points, tolerance) => {
  // Implement rectangle detection logic
  return false;
};

const createPerfectCircle = (points) => {
  // Implement perfect circle creation
  return points;
};

const createPerfectRectangle = (points) => {
  // Implement perfect rectangle creation
  return points;
};

const APPLE_COLORS = [
  '#FF3B30', // Red
  '#FF9500', // Orange
  '#FFCC00', // Yellow
  '#34C759', // Green
  '#5856D6', // Indigo
  '#AF52DE', // Purple
  '#5E5E5E'  // Gray
];

const SHAPE_TYPES = {
  SELECT: 'select',
  RECTANGLE: 'rectangle',
  CIRCLE: 'circle',
  LINE: 'line',
  PENCIL: 'pencil',
  TEXT: 'text'
};

const RENDER_BATCH_SIZE = 50; // Limit number of elements rendered at once

const ShapeComponent = ({ 
  shapeProps, 
  isSelected, 
  onSelect, 
  onChange,
  onTextChange 
}) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const renderShape = () => {
    const baseProps = {
      ref: shapeRef,
      ...shapeProps,
      draggable: true,
      onClick: onSelect,
      onDragEnd: (e) => {
        onChange({
          ...shapeProps,
          x: e.target.x(),
          y: e.target.y()
        });
      }
    };

    switch(shapeProps.type) {
      case SHAPE_TYPES.RECTANGLE:
        return (
          <Rect 
            {...baseProps}
            cornerRadius={10}
            stroke={shapeProps.stroke || 'black'}
            strokeWidth={shapeProps.strokeWidth || 2}
            onTransformEnd={() => {
              const node = shapeRef.current;
              onChange({
                ...shapeProps,
                x: node.x(),
                y: node.y(),
                width: node.width() * node.scaleX(),
                height: node.height() * node.scaleY(),
                rotation: node.rotation()
              });
            }}
          />
        );
      case SHAPE_TYPES.TEXT:
        return (
          <Text
            {...baseProps}
            editable={isSelected}
            onDblClick={() => {
              // Enable text editing
              shapeRef.current.textNode.focus();
            }}
            onTextChange={(e) => {
              onTextChange(shapeProps.id, e.target.value());
            }}
          />
        );
      case SHAPE_TYPES.PENCIL:
        return (
          <Line
            {...baseProps}
            points={shapeProps.points}
            stroke={shapeProps.stroke || 'black'}
            strokeWidth={shapeProps.strokeWidth || 5}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {renderShape()}
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

const Canvas = React.memo(({ selectedTool, zoomLevel = 1 }) => {
  const [elements, setElements] = useState([]);
  const [visibleElements, setVisibleElements] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState([]);
  const stageRef = useRef(null);

  // Error handling wrapper
  const safeSocketEmit = (event, data) => {
    try {
      socket.emit(event, data);
    } catch (error) {
      console.error(`Socket emission error for ${event}:`, error);
    }
  };

  // Virtualization with error handling
  useEffect(() => {
    try {
      const startIndex = Math.max(0, elements.length - 50);
      setVisibleElements(elements.slice(startIndex));
    } catch (error) {
      console.error('Virtualization error:', error);
    }
  }, [elements]);

  const handleElementCreate = (e) => {
    try {
      if (selectedTool === 'select') return;

      const stage = e.target.getStage();
      const point = stage.getPointerPosition();

      if (!point) {
        console.warn('Invalid pointer position');
        return;
      }

      const newElement = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: selectedTool,
        x: point.x,
        y: point.y,
        width: 150,
        height: 100,
        fill: getRandomColor(),
        stroke: 'black',
        strokeWidth: 2,
        text: selectedTool === 'text' ? 'Edit text' : '',
        points: selectedTool === 'pencil' ? [point.x, point.y] : []
      };
      
      safeSocketEmit('draw', newElement);
      setElements(prev => [...prev, newElement]);
    } catch (error) {
      console.error('Element creation error:', error);
    }
  };

  const handleMouseDown = (e) => {
    if (selectedTool === SHAPE_TYPES.PENCIL) {
      setDrawing(true);
      const point = e.target.getStage().getPointerPosition();
      setCurrentLine([point.x, point.y]);
    }
  };

  const handleMouseMove = (e) => {
    if (drawing && selectedTool === SHAPE_TYPES.PENCIL) {
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();
      setCurrentLine(prev => [...prev, point.x, point.y]);
    }
  };

  const handleMouseUp = () => {
    if (drawing && selectedTool === SHAPE_TYPES.PENCIL) {
      const newPencilElement = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: SHAPE_TYPES.PENCIL,
        points: currentLine,
        stroke: 'black',
        strokeWidth: 5
      };

      safeSocketEmit('draw', newPencilElement);
      setElements(prev => [...prev, newPencilElement]);
      setDrawing(false);
      setCurrentLine([]);
    }
  };

  const handleKeyDown = useCallback((e) => {
    if (!selectedId) return;

    switch(e.key) {
      case 'Backspace':
      case 'Delete':
        setElements(prev => prev.filter(elem => elem.id !== selectedId));
        selectShape(null);
        break;
      case 'Escape':
        selectShape(null);
        break;
      default:
        break;
    }
  }, [selectedId]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    
    socket.on('draw', (newElement) => {
      setElements(prev => [...prev, newElement]);
    });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      socket.off('draw');
    };
  }, [handleKeyDown]);

  return (
    <Stage 
      ref={stageRef}
      width={window.innerWidth} 
      height={window.innerHeight}
      scaleX={zoomLevel}
      scaleY={zoomLevel}
      className="konva-container"
      onClick={handleElementCreate}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        {visibleElements.map((elem) => (
          <ShapeComponent
            key={elem.id}
            shapeProps={elem}
            isSelected={elem.id === selectedId}
            onSelect={() => selectShape(elem.id)}
            onChange={(newAttrs) => {
              try {
                const updatedElements = elements.map((elem) => 
                  elem.id === newAttrs.id ? newAttrs : elem
                );
                setElements(updatedElements);
                safeSocketEmit('element-update', newAttrs);
              } catch (error) {
                console.error('Element update error:', error);
              }
            }}
            onTextChange={(id, newText) => {
              const updatedElements = elements.map((elem) => 
                elem.id === id ? { ...elem, text: newText } : elem
              );
              setElements(updatedElements);
              safeSocketEmit('element-update', { id, text: newText });
            }}
          />
        ))}
      </Layer>
    </Stage>
  );
});// Utility debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default Canvas;
// Add advanced drawing tool capabilities
const ADVANCED_TOOLS = {
  FREEHAND: 'freehand',
  BEZIER_CURVE: 'bezierCurve',
  GEOMETRIC_SHAPES: 'geometricShapes'
};

// Implement advanced drawing logic
const handleAdvancedDrawing = (tool, points) => {
  switch(tool) {
    case ADVANCED_TOOLS.FREEHAND:
      return { type: 'freehand', points };
    case ADVANCED_TOOLS.BEZIER_CURVE:
      return { type: 'bezierCurve', points };
    case ADVANCED_TOOLS.GEOMETRIC_SHAPES:
      return detectAndSnapGeometricShape(points);
    default:
      return { type: 'line', points };
  }
};
// Shape detection and snapping
const detectAndSnapGeometricShape = (points) => {
  const tolerance = 0.1; // Tolerance for shape detection
  
  // Detect circle
  if (isCircle(points, tolerance)) {
    return createPerfectCircle(points);
  }
  
  // Detect rectangle
  if (isRectangle(points, tolerance)) {
    return createPerfectRectangle(points);
  }
  
  // Default to original points
  return { type: 'line', points };
};