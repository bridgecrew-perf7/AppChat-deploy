const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authenticateJWT = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.get('/get-user', authenticateJWT, userController.getUser);

module.exports = router;
