const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const { verifyToken } = require('../middleware/verifyToken');

router.get('/', (req, res) => {
  res.send('API is running');
});

router.get('/chats', verifyToken, userController.getChats);

router.post('/messages', verifyToken, userController.setMessage);

module.exports = router;