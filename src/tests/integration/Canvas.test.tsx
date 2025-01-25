import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Canvas from '../../components/Canvas';
import { AppProvider } from '../../components/contexts/AppContext';
import { describe, expect, jest, test } from '@jest/globals';

jest.mock('zustand');
jest.mock('react-konva');

const mockStore = {
  elements: [],
  selectedTool: 'select',
  zoom: 1,
  updateTool: jest.fn(),
  addElement: jest.fn()
};

jest.mock('../../store/AppStore', () => ({
  useAppStore: () => mockStore
}));

describe('Canvas', () => {
  // Test 1: Basic Render
  it('renders the canvas container', () => {
    render(<Canvas />);
    const container = screen.getByTestId('canvas');
    expect(container).toBeInTheDocument();
  });

  // Test 2: Check Konva Stage
  it('shows drawing area', () => {
    render(<Canvas />);
    const stage = screen.getByTestId('konva-stage');
    expect(stage).toBeInTheDocument();
  });

  // Test 3: Check Drawing Layer
  it('has a drawing layer', () => {
    render(<Canvas />);
    const layer = screen.getByTestId('konva-layer');
    expect(layer).toBeInTheDocument();
  });
});
