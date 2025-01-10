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
      cors: { origin: "*", methods: ["GET", "POST"] },
    });

    this.users = new Map();
    this.sharedCanvasState = stateManager.initState();
    this.setupMiddleware();
    this.setupErrorHandling();
    this.setupSocketEvents();
  }

  // ... (rest of the server.js code I shared earlier)
}

const whiteboardServer = new WhiteboardServer();
whiteboardServer.start();
