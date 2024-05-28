process.env.DEBUG = "*";
import express from "express";
import logger from "morgan";
import { Server } from "socket.io";
import { createServer } from "node:http";

const port = process.env.PORT ?? 3000;

const app = express();

const server = createServer(app);
const io = new Server(server, {
  // connectionStateRecovery: {}
  // cors: {
  //   origin: "http://localhost:5173",
  // }
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  //Validar token
  if (token == "123") next();
  else next(new Error("invalid token"));
})

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  })

  socket.on("message", (message) => {
    console.log(message)
    //Solo a usuario que se conecto
    socket.emit("message", message)
    // A todos menos el emisor
    socket.broadcast.emit("message", message)
    //A todos incluido el emisor
    // io.emit("message", message)
    //Solo se envia si hay conexiones
    // socket.volatile.emit("message", message)
  })

  if(socket.recovered) {
    //Recuperar los mensajes sin conexión
  }
})

app.use(logger("dev"))
// app.get("/", (req, res) => {
//   res.sendFile(process.cwd() + "/client/index.html");
// })

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})