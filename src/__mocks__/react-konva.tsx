import React, { ReactNode } from 'react';

interface StageProps {
  children: ReactNode;
}

interface LayerProps {
  children: ReactNode;
}

export const Stage: React.FC<StageProps> = ({ children }) => (
  <div data-testid="konva-stage">{children}</div>
);

export const Layer: React.FC<LayerProps> = ({ children }) => (
  <div data-testid="konva-layer">{children}</div>
);

export const Line = () => <div data-testid="konva-line" />;
export const Rect = () => <div data-testid="konva-rect" />;
export const Circle = () => <div data-testid="konva-circle" />;
