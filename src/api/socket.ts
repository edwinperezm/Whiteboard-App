import { Socket } from 'socket.io-client';
import { Manager } from 'socket.io-client';
import { SOCKET_CONFIG } from '../config/socketConfig';
import { User, Point, CanvasState } from '../core/types';

interface CanvasUpdate {
  elements: CanvasState['elements'];
  action: string;
  userId: string;
  timestamp: number;
}

interface ServerToClientEvents {
  'connect': () => void;
  'user-joined': (user: User) => void;
  'user-left': (userId: string) => void;
  'cursor-update': (data: { userId: string; position: Point }) => void;
  'canvas-update': (data: CanvasUpdate) => void;
}

interface ClientToServerEvents {
  'canvas-update': (data: CanvasUpdate) => void;
  'cursor-update': (position: Point) => void;
  'save-state': (data: { timestamp: number; state: CanvasState }) => void;
  'user-login': (userData: User) => void;
  'user-logout': () => void;
}

const manager = new Manager(SOCKET_CONFIG.url, SOCKET_CONFIG.options);
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = manager.socket('/');

socket.on('connect', () => {
  console.log('Connected to server');
});
