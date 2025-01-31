module.exports = (http) => {
  const io = require('socket.io')(http);

  io.on("connection", (socket) => {
    console.log("user connected")
    socket.on("chat-message", (msg) => {
      io.emit("chat-message", msg);
    })

    socket.on("disconnect", () => {
      console.log("user disconnected");
    })
  })
}