import { socket } from "../api";
import ErrorService from "./errorService";

class CollaborationService {
  constructor() {
    this.users = new Map();
    this.cursors = new Map();
    this.setupSocketListeners();
  }

  setupSocketListeners() {
    socket.on("user-joined", (user) => {
      this.users.set(user.id, user);
      this.notifyUserChange();
    });

    socket.on("user-left", (userId) => {
      this.users.delete(userId);
      this.cursors.delete(userId);
      this.notifyUserChange();
    });

    socket.on("cursor-move", (data) => {
      this.updateCursor(data);
    });

    socket.on("connect_error", (error) => {
      ErrorService.handleError(error, { context: "Collaboration Socket" });
    });
  }

  updateCursor(data) {
    this.cursors.set(data.userId, {
      x: data.x,
      y: data.y,
      color: data.color || this.getRandomColor(),
      timestamp: Date.now(),
    });
  }

  sendCursorPosition(x, y) {
    try {
      socket.emit("cursor-move", {
        x,
        y,
        userId: socket.id,
        timestamp: Date.now(),
      });
    } catch (error) {
      ErrorService.handleError(error, { context: "Cursor Update" });
    }
  }

  getRandomColor() {
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEEAD",
      "#FF9999",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  getActiveUsers() {
    return Array.from(this.users.values());
  }

  getCursors() {
    return Array.from(this.cursors.entries()).map(([userId, cursor]) => ({
      userId,
      ...cursor,
      user: this.users.get(userId),
    }));
  }

  notifyUserChange() {
    // You can implement custom event emitter here
    window.dispatchEvent(
      new CustomEvent("users-updated", {
        detail: this.getActiveUsers(),
      }),
    );
  }
}

export default new CollaborationService();
