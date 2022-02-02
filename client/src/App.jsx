import React, { useEffect,useState } from "react";
import io from 'socket.io-client';

import Messages from './components/Messages';
import MessageInput from './components/MessageInput';
import './App.css';
const ENDPOINT = "http://localhost:3001";

function App() {

  const [socket, setSocket] = useState(null);

  useEffect(() => {
  const newSocket = io(ENDPOINT);
  setSocket(newSocket);
  return () => newSocket.close();
}, [setSocket]);

return (
  <div className="App">
    <header className="app-header">
      React Chat
    </header>
    { socket ? (
      <div className="chat-container">
        <Messages socket={socket} />
        <MessageInput socket={socket} />
      </div>
    ) : (
      <div>Not Connected</div>
    )}
  </div>
);
}

export default App;
