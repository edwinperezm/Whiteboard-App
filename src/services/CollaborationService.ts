import { socket } from "../api/socket";
import { User, Element } from "../core/types";

interface CanvasUpdate {
  elements: Element[];
  action: string;
  userId: string;
}

class CollaborationService {
  private roomId: string = ""; // Initialize with empty string

  joinRoom(roomId: string, userData: User) {
    this.roomId = roomId;
    socket.emit("join-room", { roomId, userData });
  }

  sendUpdate(update: CanvasUpdate) {
    socket.emit("canvas-update", {
      roomId: this.roomId,
      update,
      timestamp: Date.now(),
    });
  }

  onUpdate(callback: (update: CanvasUpdate) => void) {
    socket.on("canvas-update", callback);
  }
}

export default new CollaborationService();
