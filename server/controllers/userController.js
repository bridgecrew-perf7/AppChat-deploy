const { resMess } = require('../util/respondMessage');
const {
  isVietnamesePhoneNumber,
  passValid,
  checkCharacter,
  checkValid,
} = require('../util/util');
const User = require('../models/User');
const Room = require('../models/Room');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
  register: async (req, res) => {
    try {
      const { username, phone, password } = req.body;
      // todo: check valid
      if (!checkValid([username, phone, password])) {
        return res
          .status(400)
          .json(new resMess(false, 'Missing username or phone or password'));
      }
      if (!isVietnamesePhoneNumber(phone) || !passValid(password)) {
        return res
          .status(400)
          .json(new resMess(false, 'Invalid phone or password'));
      }
      if (checkCharacter(username) || username.trim().length > 12) {
        return res.status(400).json(new resMess(false, 'Invalid username'));
      }

      const user = await User.findOne({ phone: phone });
      if (user) {
        return res.status(400).json(new resMess(false, 'Phone is registered'));
      }

      // Todo: Password bcrypt
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Todo: Save mongodb
      const newUser = new User({ username, phone, password: passwordHash });
      await newUser.save((error) => {
        if (error) throw error;
        console.log('User is successfully registered');
      });
      return res.json(new resMess(true, 'Successful registration', newUser));
    } catch (error) {
      return res.status(500).json(new resMess(false, error.message));
    }
  },

  login: async (req, res) => {
    try {
      const { phone, password } = await req.body;
      // Todo: check valid
      if (!checkValid([phone, password])) {
        return res
          .status(400)
          .json(new resMess(false, 'Missing phone or password'));
      }
      if (!isVietnamesePhoneNumber(phone)) {
        return res.status(400).json(new resMess(false, 'Invalid phone'));
      }

      const user = await User.findOne({ phone: phone });
      let checkPass = false;
      if (user) {
        // Todo: check password bcrypt
        checkPass = bcrypt.compareSync(password, user.password);
      }
      if (user && checkPass) {
        const accessToken = jwt.sign(
          { phone: user.phone, _id: user._id },
          process.env.ACCESS_TOKEN_SECRET
        );
        console.log('Login successful!')
        return res.json(new resMess(true, 'Login successful!', accessToken));
      } else {
        return res
          .status(400)
          .json(new resMess(false, 'Phone or password in correct!'));
      }
    } catch (error) {
      return res.status(500).json(new resMess(false, error.message));
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { phone, newPassword } = req.body;
      // todo: check valid
      if (!checkValid([phone])) {
        return res.status(400).json(new resMess(false, 'Missing phone'));
      }
      if (!isVietnamesePhoneNumber(phone)) {
        return res.status(400).json(new resMess(false, 'Invalid phone'));
      }
      const user = await User.findOne({ phone: phone });
      if (user) {
        // Todo: Password bcrypt
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(newPassword, saltRounds);
        // Todo: Save mongodb
        user.password = passwordHash;
        await user.save((err) => {
          if (err) throw err;
        });
        return res.json(new resMess(true, 'Change password successfully'));
      } else {
        return res.json(new resMess(false, 'Phone not exit'));
      }
    } catch (error) {
      return res.status(500).json(new resMess(false, error.message));
    }
  },

  getUser: async (req, res) => {
    try {
      const userId = req.userId;
      const user = await User.findOne(userId);
      console.log('Get user success')
      return res.json(new resMess(true, 'Get user success', user));
    } catch (error) {
      return res.status(500).json(new resMess(false, error.message));
    }
  },
};

module.exports = userController;