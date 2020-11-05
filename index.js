//  requiring packages
const express = require("express");
const app = express();
const randomColor = require("randomcolor");
const uuid = require("uuid");

// middleware
app.use(express.static("public"));

// routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Listen on port 3000
const server = app.listen(process.env.PORT || 3000);

// socket.io instantiation
const io = require("socket.io")(server);

const users = [];
const connections = [];

// listen on every connection
io.on("connection", (socket) => {
  console.log("New user connected");
  // add the new socket to the connections array
  connections.push(socket);
  // initialize a random color for the socket
  const color = randomColor();

  // Set the first username of the user as Anonymous
  socket.username = "Anonymous";
  socket.color = color;

  // Listen on change_username
  socket.on("change_username", (data) => {
    const id = uuid.v4(); // create a random id for the user
    socket.id = id;
    socket.username = data.nickName;
    users.push({ id, username: socket.username, color: socket.color });
    updateUsernames();
  });

  // update Username in the client
  const updateUsername = () => {
    io.sockets.emit("get users", users);
  };
});
