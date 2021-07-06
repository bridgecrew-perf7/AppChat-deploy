const { resMess } = require('../util/respondMessage');
const { isVietnamesePhoneNumber, checkValid } = require('../util/util');
const User = require('../models/User');
const Room = require('../models/Room');

const friendController = {
  findFriend: async (req, res) => {
    try {
      const phone = req.body.phone;
      const user = await User.findOne({ phone: phone });
      if (user) {
        return res.json(new resMess(true, 'Find friend success', user));
      } else {
        return res.json(new resMess(false, 'Phone not exist'));
      }
    } catch (error) {
      return res.status(500).json(new resMess(false, error.message));
    }
  },
  addFriend: async (req, res) => {
    try {
      const phone = req.body.phone;
      const userId = req.userId;
      if (!checkValid([phone])) {
        return res.status(400).json(new resMess(false, 'Missing phone'));
      }
      if (!isVietnamesePhoneNumber(phone)) {
        return res.status(400).json(new resMess(false, 'Invalid phone'));
      }
      const user = await User.findOne({ phone: phone }); // tìm user muốn add
      if (!user) {
        return res.json(new resMess(false, 'Phone not exist'));
      }
      const useradd = await User.findById({ _id: userId });
      if (user.phone === useradd.phone) {
        return res.json(new resMess(false, 'Your phone'));
      }
      for (let id = 0; id < useradd.friends.length; id++) {
        if (String(useradd.friends[id]) === String(user._id)) {
          return res.json(new resMess(false, 'Your friend'));
        }
      }
      const newRoom = new Room({
        users: [{ _id: useradd._id }, { _id: user._id }],
      });
      await newRoom.save((err) => {
        if (err) throw err;
        console.log('Created room successfully');
      });
      await User.findByIdAndUpdate(
        { _id: useradd._id },
        { $push: { friends: { _id: user._id, phone: user.phone } } }
      );
      await User.findByIdAndUpdate(
        { _id: user._id },
        { $push: { friends: { _id: useradd._id, phone: useradd.phone } } }
      );
      res.json(new resMess(true, 'Add friend successfully'));
    } catch (error) {
      return res.status(500).json(new resMess(false, error.message));
    }
  },

  getFriend: async (req, res) => {
    try {
      const userId = req.userId;
      const listFriend = await Room.find({ users: { $all: [userId] } })
        .sort({
          createAt: 'desc',
        })
        .populate({
          path: 'users',
          match: { _id: { $ne: userId } },
          select: 'username avatar',
        });
      return res.json(new resMess(true, 'Get Room success', listFriend));
    } catch (error) {
      return res.status(500).json(new resMess(false, error.message));
    }
  },

  getMessage: async (req, res) => {
    try {
      const roomId = req.params.id;
      const room = await Room.findById(roomId);
      res.json(new resMess(true, 'Get message success', room));
    } catch (error) {
      return res.status(500).json(new resMess(false, error.message));
    }
  },
};

module.exports = friendController;
