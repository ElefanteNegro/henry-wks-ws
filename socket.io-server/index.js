
const express = require("express");
const socket = require("socket.io");

// App setup
let messageId = 0;
const users = [];

const setMessage = (message, userId) => {
  return {
    id: messageId ++,
    user: {
      name: userId,
    },
    value: message,
  }
}
const PORT = process.env.PORT || 3001;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server,{ 
    cors: {
        origin: "*",
      }
});

io.on("connection", function (socket) {
    console.log("Conexión exitosa");
    users.push(socket.id);
    console.log(users.length);
    if(users.length % 2){
      socket.join('par');
    } 
    else{
      socket.join('impar');
    }
    
    socket.on('message', (message)=> {
      const userIndex = users.findIndex((id)=> socket.id === id);
      console.log('userIndex', userIndex)
  //  if( !((userIndex + 1) % 2)){
     socket.to('par').emit('message', setMessage(message, socket.id))
    //  socket.emit('message', setMessage(message, socket.id))
  //  }else{
     socket.to('impar').emit('message', setMessage(message, socket.id))
     socket.emit('message', setMessage(message, socket.id))
  //  };
      // io.emit('message', setMessage(message))
    })
});
