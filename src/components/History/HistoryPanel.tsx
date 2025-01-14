import React from 'react';
import { useAppStore } from '../../store/AppStore';

export const HistoryPanel = () => {
  const { history, currentIndex, jumpToState } = useAppStore();
  
  return (
    <div className="history-panel">
      {history.map((state, index) => (
        <div 
          key={index}
          className={`history-item ${index === currentIndex ? 'active' : ''}`}
          onClick={() => jumpToState(index)}
        >
          {state.type} - {new Date(state.timestamp).toLocaleTimeString()}
        </div>
      ))}
    </div>
  );
};
