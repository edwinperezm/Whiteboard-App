import React, { useRef, useEffect } from 'react';
import { useAppStore } from '../../store/AppStore';
import { drawElement } from '../../utils/drawUtils';

export const Minimap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { elements } = useAppStore();
  const scale = 0.1;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, 200, 150);
    elements.forEach(el => drawElement(ctx, el, scale));
  }, [elements]);

  return (
    <canvas ref={canvasRef} width={200} height={150} className="minimap" />
  );
};
