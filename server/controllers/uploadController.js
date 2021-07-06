const { resMess } = require('../util/respondMessage');
const User = require('../models/User');
const Room = require('../models/Room');
const path = require('path');

const uploadController = {
  uploadAvatar: async (req, res) => {
    try {
      const userId = req.userId;
      const filename = req.file.originalname;
      await User.findOneAndUpdate({ _id: userId }, { avatar: filename }).exec(
        (err) => {
          if (err) throw err;
        }
      );
      console.log('upload thanh cong');
      return res.json(new resMess(true, 'Upload avatar successfully'));
    } catch (error) {
      return res.status(500).json(new resMess(false, 'not avat'));
    }
  },
  getAvatar: async (req, res) => {
    try {
      const userId = req.userId;
      const user = await User.findOne({ _id: userId });
      res.json(new resMess(true, 'Get avatar success', user.avatar));
      console.log('get avatar successfully');
    } catch (error) {
      return res.status(500).json(new resMess(false, error.message));
    }
  },
  uploadMedia: async (req, res) => {
    try {
      const filename = await req.file.originalname;
      const fileType = await req.file.mimetype;
      console.log('upload thanh cong');
      return res.json(
        new resMess(true, 'Upload media successfully', { filename, fileType })
      );
    } catch (error) {
      return res.status(500).json(new resMess(false, error.message));
    }
  },
};

module.exports = uploadController;
