const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/get/currentuser', userController.getUserData);
router.post('/add/user', userController.addNewUser);
router.get('/', userController.isUserExist);

module.exports = router;