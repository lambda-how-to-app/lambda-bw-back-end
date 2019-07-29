const express = require('express');
const controller = require('../controllers/User');
const UserValidation = require('../middlewares/UserValidation');

const router = express.Router();

router.post('/auth/signup', UserValidation.userInput, controller.createUser);

module.exports = router;
