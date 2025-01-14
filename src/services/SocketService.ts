import io from 'socket.io-client';

class SocketService {
  socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:3001');

  connect() {
    this.socket.connect();
  }

  joinRoom(roomId: string) {
    this.socket.emit('join-room', roomId);
  }

  onCanvasUpdate(callback: (data: any) => void) {
    this.socket.on('canvas-update', callback);
  }
}

export default new SocketService();
