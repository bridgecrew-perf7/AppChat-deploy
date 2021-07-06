require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/db.js')();
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const server = require('http').createServer(app);
const Room = require('./models/Room');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/upload', express.static('upload'));
app.use(cors());

// Routes
const userRouter = require('./routes/user');
const uploadRouter = require('./routes/upload');
const friendRouter = require('./routes/friend');
app.use('/user', userRouter);
app.use('/upload', uploadRouter);
app.use('/friend', friendRouter);

// Server on
server.listen(PORT, () => {
  console.log(`Server on: http://localhost:${PORT}`);
});

// Socket IO
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  socket.on('send-message', async (data) => {
    let newMess = {
      sender: data.userId,
      message: data.message.trim(),
      type: data.type,
    };
    await Room.findByIdAndUpdate(
      { _id: data.roomId },
      { $push: { messages: { $each: [newMess] } } },
      { new: true }
    ).exec((err, doc) => {
      if (err) throw err;
      socket.to(data.roomId).emit('receive-message', doc);
    });
  });
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
  });
});
