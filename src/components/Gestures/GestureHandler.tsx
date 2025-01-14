import React from 'react';
import { useAppStore } from '../../store/AppStore';

export const GestureHandler = () => {
  const { handlePinch, handlePan } = useAppStore();
  
  return (
    <div 
      className="gesture-handler"
      onTouchStart={handlePinch}
      onTouchMove={handlePan}
    />
  );
};
