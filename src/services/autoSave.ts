import SocketService from "./SocketService";
import { CanvasState } from "../core/types";

export const autoSave = (state: CanvasState) => {
  SocketService.socket.emit("canvas-update", {
    state,
    timestamp: Date.now(),
  });
};

export const setupAutoSave = (getState: () => CanvasState) => {
  const INTERVAL = 60000; // 1 minute
  const intervalId = setInterval(() => {
    autoSave(getState());
  }, INTERVAL);
  return () => clearInterval(intervalId);
};
