const express = require('express');
const controller = require('../controllers/User');
const UserValidation = require('../middlewares/UserValidation');
const AuthenticateToken = require('../auth/AuthenticateToken');
const IdValidation = require('../middlewares/IdValidation');

const router = express.Router();

router.post('/auth/signup', UserValidation.userInput, controller.createUser);
router.post('/auth/login', UserValidation.userLogin, controller.login);
router
  .route('/profile/:id')
  .get(AuthenticateToken, IdValidation, controller.getProfile);

module.exports = router;
