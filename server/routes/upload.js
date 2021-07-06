const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');

const constants = require('./constants');
const uploadController = require('../controllers/uploadController');

router.post(
  '/avatar',
  authenticateJWT,
  constants.upload.single('file'),
  uploadController.uploadAvatar
);
router.get('/get-avatar', authenticateJWT, uploadController.getAvatar);
router.post(
  '/media',
  authenticateJWT,
  constants.media.single('file'),
  uploadController.uploadMedia
);

module.exports = router;
