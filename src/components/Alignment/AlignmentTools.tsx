import React from 'react';
import { useAppStore } from '../../store/AppStore';
import { ElementType } from '../../core/types';

export const AlignmentTools: React.FC = () => {
  const store = useAppStore();
  
  return (
    <div className="alignment-tools">
      <button onClick={() => store.alignElements('left')}>
        Align Left
      </button>
      <button onClick={() => store.alignElements('right')}>
        Align Right
      </button>
      <button onClick={() => store.alignElements('top')}>
        ↑
      </button>
      <button onClick={() => store.alignElements('bottom')}>
        ↓
      </button>
    </div>
  );
};