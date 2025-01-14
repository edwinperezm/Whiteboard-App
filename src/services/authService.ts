import SocketService from './SocketService';

class AuthService {
  async login(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
    SocketService.socket.emit('user-login', userData);
    return userData;
  }

  logout() {
    localStorage.removeItem('user');
    SocketService.socket.emit('user-logout');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
