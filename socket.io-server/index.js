
const express = require("express");
const socket = require("socket.io");

// App setup
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
});
