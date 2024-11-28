const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')




//sign up
router.post('/signup', userController.signUp)


router.post('/login', userController.logIn);


module.exports = router;