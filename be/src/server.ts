import express, { Application } from "express";
import cors from "cors";
import http from "http";
import { Server, Socket } from "socket.io";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

let chatMessages: Array<{ message: string }> = [];

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  socket.on("message", (data: { message: string }) => {
    chatMessages.push(data);
    io.emit("message", data);
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));