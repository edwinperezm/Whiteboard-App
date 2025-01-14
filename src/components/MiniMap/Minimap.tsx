import React, { useRef, useEffect } from 'react';
import { useAppStore } from '../../store/AppStore';

export const Minimap = () => {
  const canvasRef = useRef(null);
  const { elements } = useAppStore();
  const scale = 0.1;

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, 200, 150);
    elements.forEach(el => drawElement(ctx, el, scale));
  }, [elements]);

  return (
    <canvas ref={canvasRef} width={200} height={150} className="minimap" />
  );
};
