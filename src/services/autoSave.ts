import { socketService } from "./SocketService";
import { CanvasState } from "../core/types";

export const autoSave = (state: CanvasState) => {
  socketService.socket.emit("save-state", {
    timestamp: Date.now(),
    state,
  });
};

export const setupAutoSave = (getState: () => CanvasState) => {
  const INTERVAL = 60000; // 1 minute
  const intervalId = setInterval(() => {
    autoSave(getState());
  }, INTERVAL);
  return () => clearInterval(intervalId);
};
