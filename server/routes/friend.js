const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');

const friendController = require('../controllers/friendController');

router.post('/find-friend', authenticateJWT, friendController.findFriend);
router.post('/add-friend', authenticateJWT, friendController.addFriend);
router.get('/get-friend', authenticateJWT, friendController.getFriend);
router.get('/get-message/:id', authenticateJWT, friendController.getMessage);

module.exports = router;
