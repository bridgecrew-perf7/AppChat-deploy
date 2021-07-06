const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      maxLength: 15,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      maxLength: 10,
      required: true,
    },
    password: { type: String, required: true },
    avatar: { type: String, default: 'avatar-default.jpg' },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
