const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const stateManager = require("./stateManager");
const cors = require("cors");

class WhiteboardServer {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new Server(this.server, {
      cors: { origin: "*", methods: ["GET", "POST"] }
    });

    this.users = new Map();
    this.sharedCanvasState = stateManager.initState();
    this.setupMiddleware();
    this.setupErrorHandling();
    this.setupSocketEvents();
  }

  setupMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
    
    // Global error handler middleware
    this.app.use((err, req, res, next) => {
      console.error('Unhandled Error:', err);
      res.status(500).json({
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'production' ? {} : err.message
      });
    });
  }

  setupErrorHandling() {
    // Catch unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });

    // Catch uncaught exceptions
    process.on('uncaughtException', (error) => {
      console.error('Uncaught Exception:', error);
      // Optionally restart the server or perform cleanup
      process.exit(1);
    });
  }

  setupSocketEvents() {
    this.io.on("connection", (socket) => {
      socket.use((packet, next) => {
        try {
          // Add middleware for socket event validation
          next();
        } catch (error) {
          console.error('Socket middleware error:', error);
          next(new Error('Invalid socket event'));
        }
      });

      socket.on("error", (error) => {
        console.error('Socket error:', error);
      });

      console.log(`User connected: ${socket.id}`);
      
      socket.join("whiteboard-room");
      
      // Send initial state
      socket.emit("initialState", this.sharedCanvasState);

      socket.on("user-join", (userData) => {
        this.users.set(socket.id, {
          id: socket.id,
          name: userData.name,
          color: this.generateUserColor()
        });

        // Broadcast user join
        this.io.emit("user-list", Array.from(this.users.values()));
      });

      socket.on("cursor-move", (cursorData) => {
        socket.broadcast.emit("remote-cursor", {
          ...cursorData,
          userId: socket.id
        });
      });

      // Collaborative events
      socket.on("draw", this.handleDraw.bind(this, socket));
      socket.on("element-move", this.handleElementMove.bind(this, socket));
      socket.on("disconnect", this.handleDisconnect.bind(this, socket));
    });
  }

  handleDraw(socket, data) {
    socket.broadcast.to("whiteboard-room").emit("draw", data);
    stateManager.updateState(this.sharedCanvasState, data);
  }

  handleElementMove(socket, data) {
    socket.broadcast.to("whiteboard-room").emit("element-moved", data);
    stateManager.updateState(this.sharedCanvasState, data, 'move');
  }

  handleDisconnect(socket) {
    console.log(`User disconnected: ${socket.id}`);
    socket.broadcast.emit("user-left", socket.id);
  }

  start(port = 3001) {
    this.server.listen(port, () => {
      console.log(`Whiteboard server running on port ${port}`);
    });
  }

  generateUserColor() {
    // Implement color generation logic
  }
}
const whiteboardServer = new WhiteboardServer();whiteboardServer.start();