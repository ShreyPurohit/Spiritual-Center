import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { addUser, generateMessage, getUser, getUsersInRoom, removeUser } from "./lib/helpers/chatFunctions.mjs";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("New Web Socket Connection");

    socket.on('join', ({ username, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, username, room })
      if (error) {
        return callback(error)
      }
      socket.join(user.room)
      console.log(username + " Joined " + room);

      socket.emit("message", generateMessage("ADMIN", 'Welcome!'))
      socket.broadcast.to(user.room).emit("message", generateMessage('ADMIN', `${user.username} Has Joined`))
      io.to(user.room).emit('roomData', {
        room: user?.room,
        users: getUsersInRoom(user.room)
      })
      callback()
    })

    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id)
      console.log(user?.username, message);

      io.to(user.room).emit('message', generateMessage(user.username, message))
      callback()
    })

    socket.on('leaveChat', (callback) => {
      const user = removeUser(socket.id)
      io.to(user.room).emit('message', generateMessage('ADMIN', `${user.username} Has Left`))
      callback()
    })

    socket.on('disconnect', () => {
      const user = removeUser(socket.id)
      if (user) {
        io.to(user.room).emit('message', generateMessage('ADMIN', `${user.username} Has Left`))
        io.to(user.room).emit('roomData', {
          room: user?.room,
          users: getUsersInRoom(user.room)
        })
      }
    })

  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});