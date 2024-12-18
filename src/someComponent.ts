import React, { useEffect, useState, useRef, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Socket, io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'ws://localhost:3000';

const ErrorService = {
  handleError: (error: Error, context?: any) => {
    console.error('Error:', error, context);
  }
};

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface CanvasProps {
  selectedTool: string;
  zoomLevel?: number;
}

// Interfaces for text and drawing elements
interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  focus?: () => void;
}

interface DrawElement {
  type: string;
  x: number;
  y: number;
  color?: string;
}

// Safe text element handler
class TextHandler {
  private textElements: Map<string, TextElement> = new Map();

  addTextElement(element: TextElement) {
    this.textElements.set(element.id, element);
  }

  removeTextElement(id: string) {
    this.textElements.delete(id);
  }

  focusTextElement(id: string) {
    const textElement = this.textElements.get(id);
    if (textElement && typeof textElement.focus === 'function') {
      try {
        textElement.focus();
      } catch (error) {
        console.error('Failed to focus text element:', error);
      }
    }
  }
}

// Create a singleton instance
const textHandler = new TextHandler();

class ErrorBoundary extends React.Component<ErrorBoundaryProps, { hasError: boolean }> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('Error caught by boundary:', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    ErrorService.handleError(error, { 
      context: 'React Error Boundary',
      componentStack: errorInfo.componentStack 
    });
  }

  render() {
    if (this.state.hasError) {
      return React.createElement('div', null, 'Something went wrong.');
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

// Canvas Component with improved text handling
const Canvas: React.FC<CanvasProps> = ({ selectedTool, zoomLevel = 1 }) => {
  const [, setElements] = useState<DrawElement[]>([]);
  const [, setTextElements] = useState<TextElement[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(SOCKET_URL, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    const handleDraw = (newElement: DrawElement) => {
      setElements(prev => [...prev, newElement]);
    };

    const handleTextElement = (textElement: TextElement) => {
      setTextElements(prev => {
        // Add or update text element
        const existingIndex = prev.findIndex(el => el.id === textElement.id);
        if (existingIndex !== -1) {
          const updatedElements = [...prev];
          updatedElements[existingIndex] = textElement;
          return updatedElements;
        }
        return [...prev, textElement];
      });

      // Register with text handler
      textHandler.addTextElement(textElement);
    };

    socketRef.current.on('draw', handleDraw);
    socketRef.current.on('textElement', handleTextElement);

    return () => {
      socketRef.current?.off('draw', handleDraw);
      socketRef.current?.off('textElement', handleTextElement);
      socketRef.current?.disconnect();
    };
  }, []);

  const handleCanvasInteraction = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!socketRef.current || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const newElement: DrawElement | TextElement = {
      type: selectedTool,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      color: 'black',
      ...(selectedTool === 'text' && { 
        id: `text-${Date.now()}`,
        text: '',
        focus: () => {
          // Implement focus logic
          console.log('Focusing text element');
        }
      })
    };

    socketRef.current.emit(
      selectedTool === 'text' ? 'textElement' : 'draw', 
      newElement
    );
  };

  return React.createElement('canvas', {
    ref: canvasRef,
    onMouseDown: handleCanvasInteraction,
    style: { transform: `scale(${zoomLevel})` }
  });

};Canvas.propTypes = {
  selectedTool: PropTypes.string.isRequired,
  zoomLevel: PropTypes.number
};

export default Canvas;