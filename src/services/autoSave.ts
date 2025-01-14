import { socket } from '../api';

export const autoSave = (state: any) => {
  socket.emit('save-state', {
    timestamp: Date.now(),
    state
  });
};

export const setupAutoSave = (getState: () => any) => {
  const INTERVAL = 60000;
  const intervalId = setInterval(() => {
    autoSave(getState());
  }, INTERVAL);
  return () => clearInterval(intervalId);
};
