import io from "socket.io-client";
import { CanvasState, User } from "../core/types";

interface SocketUpdate {
  state: CanvasState;
  userId: string;
  timestamp: number;
}

class SocketService {
  socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:3001");

  connect() {
    this.socket.connect();
  }

  joinRoom(roomId: string) {
    this.socket.emit("join-room", roomId);
  }

  onCanvasUpdate(callback: (data: SocketUpdate) => void) {
    this.socket.on("canvas-update", callback);
  }
}

export const socketService = new SocketService();
export default socketService;
