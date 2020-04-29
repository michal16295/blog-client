import * as io from "socket.io-client";
const events = require("events");

class ChatSocketServer {
  socket = null;
  eventEmitter = new events.EventEmitter();

  // Connecting to Socket Server
  establishSocketConnection(userId) {
    try {
      this.socket = io(`http://localhost:5000`, {
        query: `userId=${userId}`,
      });
    } catch (error) {
      alert(`Something went wrong; Can't connect to socket server`);
    }
  }

  listenToSocket() {
    this.socket.on("chat-list-user-logout", (data) => {
      console.log("chat-list-user-logout", data);
      this.eventEmitter.emit("chat-list-user-logout", data);
    });
    this.socket.on("user-block-response", (data) => {
      console.log("user-block-response", data);
      this.eventEmitter.emit("user-block-response", data);
    });
    this.socket.on("add-message-response", (data) => {
      console.log("add-message-response", data);
      this.eventEmitter.emit("add-message-response", data);
    });

    this.socket.on("user-login-response", (data) => {
      console.log("user-login-response", data);
      this.eventEmitter.emit("user-login-response", data);
    });
  }

  sendMessage(data) {
    this.socket.emit("add-message", data);
  }

  logout(userName) {
    this.socket.emit("logout", userName);
    this.socket.on("logout-response", (data) => {
      this.eventEmitter.emit("logout-response", data);
    });
  }

  login(userName) {
    this.socket.emit("login", userName);
    this.socket.on("login-response", (data) => {
      this.eventEmitter.emit("login-response", data);
    });
  }

  block(data) {
    console.log(data);
    this.socket.emit("block", data);
    this.socket.on("block-response", (data) => {
      this.eventEmitter.emit("block-response", data);
    });
  }
}

export default new ChatSocketServer();
