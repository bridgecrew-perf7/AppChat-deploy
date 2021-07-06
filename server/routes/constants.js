const multer = require('multer');
const { resMess } = require('../util/respondMessage');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'video/mp4' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const fileMedia = (req, file, cb) => {
  if (
    file.mimetype === 'video/mp4' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter });
const media = multer({ storage: storage, fileMedia });

module.exports = {
  upload,
  media,
};
