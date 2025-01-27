import React from 'react';
import { useAppStore } from '../../store/AppStore';
import { Element } from '../../core/types';

interface HistoryState {
  elements: Element[];
  timestamp: number;
  type: string;
}

export const HistoryPanel: React.FC = () => {
  const { history, currentIndex, jumpToState } = useAppStore();

  return (
    <div className="history-panel">
      {history.map((elements: Element[], index: number) => {
        const state: HistoryState = {
          elements,
          timestamp: Date.now(),
          type: 'State Update'
        };
        return (
          <div
            key={state.timestamp}
            className={`history-item ${currentIndex === index ? 'active' : ''}`}
            onClick={() => jumpToState(index)}
          >
            {state.type} - {new Date(state.timestamp).toLocaleTimeString()}
          </div>
        );
      })}
    </div>
  );
};
