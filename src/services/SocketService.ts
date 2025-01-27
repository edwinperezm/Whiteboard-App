import { Manager } from "socket.io-client";
import { Socket as IOSocket } from "socket.io-client";
import { CanvasState } from "../core/types";
import ErrorService from "./errorService";

interface ServerToClientEvents {
  'connect_error': (error: Error) => void;
  'disconnect': (reason: string) => void;
  'canvas-update': (data: CanvasUpdate) => void;
}

interface ClientToServerEvents {
  'canvas-update': (data: CanvasUpdate) => void;
}

interface CanvasUpdate {
  state: CanvasState;
  timestamp: number;
}

class SocketService {
  private _socket: IOSocket<ServerToClientEvents, ClientToServerEvents> | null = null;
  private reconnectAttempts = 0;
  private readonly MAX_RECONNECT_ATTEMPTS = 5;

  get socket(): IOSocket<ServerToClientEvents, ClientToServerEvents> {
    if (!this._socket) {
      throw new Error('Socket not initialized. Call connect() first.');
    }
    return this._socket;
  }

  connect(): void {
    try {
      const manager = new Manager(process.env.REACT_APP_SOCKET_URL || 'http://localhost:3001', {
        reconnection: true,
        reconnectionAttempts: this.MAX_RECONNECT_ATTEMPTS,
        reconnectionDelay: 1000,
      });
      this._socket = manager.socket('/') as IOSocket<ServerToClientEvents, ClientToServerEvents>;
      this.setupEventHandlers();
    } catch (error) {
      ErrorService.logError(error as Error, 'Socket connection failed');
      throw error;
    }
  }

  private setupEventHandlers(): void {
    if (!this._socket) return;

    this._socket.on('connect_error', (error: Error) => {
      ErrorService.logError(error, 'Socket connection error');
      this.reconnectAttempts++;
      
      if (this.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) {
        this.handleConnectionFailure();
      }
    });

    this._socket.on('disconnect', (reason: string) => {
      console.log('Disconnected:', reason);
      if (reason === 'io server disconnect') {
        this.connect();
      }
    });
  }

  private handleConnectionFailure(): void {
    ErrorService.logError(
      new Error('Maximum reconnection attempts reached'),
      'Socket connection failed'
    );
    window.dispatchEvent(new CustomEvent('socket-connection-failed'));
  }

  emitCanvasUpdate(state: CanvasState): void {
    if (!this._socket) return;
    
    this._socket.emit('canvas-update', {
      state,
      timestamp: Date.now()
    });
  }
}

export default new SocketService();
