import io from 'socket.io-client';
import { SOCKET_CONFIG } from '../config/socketConfig';

export const socket = io(SOCKET_CONFIG.url, SOCKET_CONFIG.options);

socket.on('connect', () => {
  console.log('Connected to server');
});
