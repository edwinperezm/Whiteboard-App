import { socket } from '../api/socket';

class CollaborationService {
  private roomId: string;

  joinRoom(roomId: string, userData: any) {
    this.roomId = roomId;
    socket.emit('join-room', { roomId, userData });
  }

  sendUpdate(update: any) {
    socket.emit('canvas-update', {
      roomId: this.roomId,
      update,
      timestamp: Date.now()
    });
  }

  onUpdate(callback: (update: any) => void) {
    socket.on('canvas-update', callback);
  }
}

export default new CollaborationService();
