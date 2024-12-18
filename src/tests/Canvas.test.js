import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Canvas from '../Canvas';
import { socket } from '../api';

// Mock socket
jest.mock('../api', () => ({
  socket: {
    emit: jest.fn(),
    on: jest.fn()
  }
}));

describe('Canvas Component', () => {
  test('renders canvas', () => {
    render(<Canvas selectedTool="select" />);
    const canvasElement = screen.getByTestId('canvas-stage');
    expect(canvasElement).toBeInTheDocument();
  });

  test('creates shape on click', () => {
    render(<Canvas selectedTool="rectangle" />);
    const canvas = screen.getByTestId('canvas-stage');
    
    fireEvent.click(canvas, { 
      clientX: 100, 
      clientY: 100 
    });

    expect(socket.emit).toHaveBeenCalledWith('draw', expect.objectContaining({
      type: 'rectangle',
      x: expect.any(Number),
      y: expect.any(Number)
    }));
  });
  // Add more test cases for different interactions
});
