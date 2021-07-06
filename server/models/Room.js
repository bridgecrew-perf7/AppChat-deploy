const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    users: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ],
    messages: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        message: { type: String },
        type: { type: String },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
