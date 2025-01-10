export const SOCKET_CONFIG = {
  URL: process.env.REACT_APP_SOCKET_URL || "http://localhost:3001",
  OPTIONS: {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  },
};
