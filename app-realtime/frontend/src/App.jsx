import io from 'socket.io-client'
import { useState } from 'react'
import { useEffect } from 'react';
const socket = new io("/");
// const socket = new io("http://localhost:3000");

console.log(socket)
function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  }

  useEffect(() => {
   socket.on("message", (message) => {
    receiveMessage(message)
   })
   socket.on("connect_error", (err) => {
    alert(err.message)
   })
   return () => socket.off("message")
  }, [])

  const receiveMessage = (message) => setMessages(state => [...state, message])
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Type a message' value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((message, index) => <li key={index}>{message}</li>)}
      </ul>
    </>
  )
}

export default App
