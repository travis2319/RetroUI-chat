const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);

let logs = []; // Array to store logs
let messages = []; // Array to store messages
let connectedUsers = []; // Array to store connected users with their usernames

app.get("/", (req, res) => {
  res.send(`<pre>${logs.join("\n")}</pre>`);
});

// app.get("/total-users", (req, res) => {
//   res.json({ totalUsers: connectedUsers.size });
// });

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  // connectedUsers.add(socket.id); // Add the new user to the set

  const connectionLog = `⚡: ${socket.id} user just connected!`;
  console.log(connectionLog);
  logs.push(connectionLog);

  socket.emit("welcome", `welcome to the server`);

  socket.broadcast.emit("welcome", `New ${socket.id} user has joined`);

  socket.on("user", (data) => {
    console.log(data);
    connectedUsers.push(data);
    //messages.push(data); // Store the message data
    // io.emit("messageResponse", connectedUsers);
    io.emit("user_list", connectedUsers);
  });

  socket.on("send_message", (data) => {
    socket.broadcast.emit("send_message", data);
  });

  socket.on("disconnect", () => {
    const userIndex = connectedUsers.findIndex((user) => user.id === socket.id);
    if (userIndex !== -1) {
      const username = connectedUsers[userIndex].name;
      connectedUsers.splice(userIndex, 1); // Remove the disconnected user from the array

      const disconnectLog = `🔥: ${username} (${socket.id}) user disconnected`;
      console.log(disconnectLog);
      logs.push(disconnectLog);

      // Emit the updated list of connected users
      io.emit("user_list", connectedUsers);
    }
  });
});

server.listen(3000, () => {
  console.log("Server Running at http://localhost:3000");
});
