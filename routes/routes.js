const express = require('express');
const controller = require('../controllers/User');
// const Location = require('../controllers/LocationsController');
const LifeHack = require('../controllers/LifehacksControllers');
const HackSteps = require('../controllers/StepsControllers');
const UserValidation = require('../middlewares/UserValidation');
const AuthenticateToken = require('../auth/AuthenticateToken');
// const IdValidation = require('../middlewares/IdValidation');

const router = express.Router();

router.post('/auth/signup', UserValidation.userInput, controller.createUser);
router.post('/auth/login', UserValidation.userLogin, controller.login);

router.route('/users').get(AuthenticateToken, controller.getAllUsers);

router.route('/users/:id').get(AuthenticateToken, controller.getAUser);
// router
//   .route('/profile/:id')
//   .get(AuthenticateToken, IdValidation, controller.getProfile);

// router.route('/profile').get(AuthenticateToken, controller.getAllUsers);

// router
//   .route('/users/profile')
//   .get(AuthenticateToken, (req, res) =>
//     controller.getAllUsers(req, res, 'users')
//   );
// router
//   .route('/guides/profile')
//   .get(AuthenticateToken, (req, res) =>
//     controller.getAllUsers(req, res, 'guides')
//   );

// router
//   .route('/user/profile')
//   .post(
//     AuthenticateToken,
//     UserValidation.createProfile,
//     controller.createProfile
//   );

// router.route('/location').get(Location.getLocations);
// router
//   .route('/location/:id')
//   .get(AuthenticateToken, UserValidation.locationId, Location.getLocationById);

router
  .route('/lifehack')
  .get(AuthenticateToken, LifeHack.getLifeHacks)
  .post(
    AuthenticateToken,
    UserValidation.lifehackValidation,
    LifeHack.createLifeHack
  );
router
  .route('/lifehack/:id')
  .get(AuthenticateToken, LifeHack.getOneHack)
  .put(
    AuthenticateToken,
    UserValidation.lifehackValidation,
    LifeHack.updateHack
  )
  .delete(AuthenticateToken, LifeHack.deleteHack);

router
  .route('/step/:id/lifehack')
  .get(AuthenticateToken, HackSteps.getStepsForASingleHack)
  .post(
    AuthenticateToken,
    UserValidation.stepsValidation,
    HackSteps.createStep
  );
module.exports = router;
