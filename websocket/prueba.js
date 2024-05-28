const express = require("express");

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static("public"));


io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");
  socket.emit("Mensaje", "Bienvenido");
});

server.listen(8080, () => {
  console.log("Listening in port 8080");
})