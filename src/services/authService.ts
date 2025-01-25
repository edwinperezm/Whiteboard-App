import { User } from "../core/types";
import { socketService } from "./SocketService";

class AuthService {
  async login(userData: User) {
    localStorage.setItem("user", JSON.stringify(userData));
    socketService.socket.emit("user-login", userData);
    return userData;
  }

  logout() {
    localStorage.removeItem("user");
    socketService.socket.emit("user-logout");
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }
}

export const authService = new AuthService();
export default authService;
