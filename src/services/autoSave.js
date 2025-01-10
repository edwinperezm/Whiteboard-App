import { socket } from "../api";

export const autoSave = (canvasState) => {
  const saveData = {
    timestamp: Date.now(),
    state: canvasState,
  };

  socket.emit("save-canvas", saveData);
};

export const setupAutoSave = (canvasState) => {
  const SAVE_INTERVAL = 60000; // 1 minute

  const intervalId = setInterval(() => {
    autoSave(canvasState);
  }, SAVE_INTERVAL);

  return () => clearInterval(intervalId);
};
