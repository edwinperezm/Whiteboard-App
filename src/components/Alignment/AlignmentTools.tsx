import React from 'react';
import { useAppStore } from '../../store/AppStore';

export const AlignmentTools = () => {
  const { alignElements } = useAppStore((state) => ({
    alignElements: state.alignElements as (direction: string) => void,
  }));
  
  return (
    <div className="alignment-tools">
      <button onClick={() => alignElements('left')}>⟵</button>
      <button onClick={() => alignElements('center')}>↔</button>
      <button onClick={() => alignElements('right')}>⟶</button>
      <button onClick={() => alignElements('top')}>↑</button>
      <button onClick={() => alignElements('middle')}>↕</button>
      <button onClick={() => alignElements('bottom')}>↓</button>
    </div>
  );
};