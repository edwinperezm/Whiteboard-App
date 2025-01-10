import { io } from "socket.io-client";

export const socket = io("http://localhost:3001", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

socket.on("connect_error", (error) => {
  console.error("Socket connection error:", error);
});
