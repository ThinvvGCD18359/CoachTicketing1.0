const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.patch('/add/role', accountController.addUserRole);
router.get('/', accountController.getAllUsers);

module.exports = router;