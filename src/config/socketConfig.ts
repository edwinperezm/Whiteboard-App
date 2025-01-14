export const SOCKET_CONFIG = {
    url: process.env.REACT_APP_SOCKET_URL || 'http://localhost:3001',
    options: {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    }
  };
  