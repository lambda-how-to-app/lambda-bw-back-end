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

router.route('/profile').get(AuthenticateToken, controller.getAllUsers);

router
  .route('/users/profile')
  .get(AuthenticateToken, (req, res) =>
    controller.getAllUsers(req, res, 'users')
  );
router
  .route('/guides/profile')
  .get(AuthenticateToken, (req, res) =>
    controller.getAllUsers(req, res, 'guides')
  );

router
  .route('/user/profile')
  .post(
    AuthenticateToken,
    UserValidation.createProfile,
    controller.createProfile
  );

module.exports = router;
