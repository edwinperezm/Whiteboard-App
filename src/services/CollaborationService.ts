import { socket } from "../api/socket";
import { User, Element, CanvasState, Point } from "../core/types";
import ErrorService from "./errorService";

interface CanvasUpdate {
  elements: Element[];
  action: string;
  userId: string;
  timestamp: number;
}

class CollaborationService {
  private users: Map<string, User> = new Map();

  constructor() {
    this.setupSocketListeners();
  }

  private setupSocketListeners() {
    socket.on("user-joined", (user: User) => {
      this.users.set(user.id, user);
    });

    socket.on("user-left", (userId: string) => {
      this.users.delete(userId);
    });

    socket.on("cursor-update", (data: { userId: string; position: Point }) => {
      const user = this.users.get(data.userId);
      if (user) {
        user.cursor = data.position;
      }
    });
  }

  updateCanvas(state: CanvasState) {
    try {
      socket.emit("canvas-update", {
        elements: state.elements,
        action: "update",
        timestamp: Date.now()
      });
    } catch (error) {
      ErrorService.logError(error as Error, "Failed to update canvas");
    }
  }

  onCanvasUpdate(callback: (data: CanvasUpdate) => void) {
    socket.on("canvas-update", callback);
  }

  updateCursor(position: Point) {
    try {
      socket.emit("cursor-update", position);
    } catch (error) {
      ErrorService.logError(error as Error, "Failed to update cursor");
    }
  }

  getActiveUsers(): User[] {
    return Array.from(this.users.values());
  }
}

export default new CollaborationService();
