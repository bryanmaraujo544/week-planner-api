const { Router } = require('express');
const AuthController = require('./app/controllers/AuthController');
const UserController = require('./app/controllers/UserController');
const WorkoutController = require('./app/controllers/WorkoutController');
const jwtAuth = require('./app/middlewares/jwtAuth');
const router = Router();

router.get('/users', UserController.index);
router.post('/users', UserController.store);

router.get('/auth', jwtAuth, (req, res) => {
  const auth = req.auth;
  res.json({ message: 'token-valid', auth });
});
router.post('/auth/login', AuthController.login);

router.post('/workouts', jwtAuth, WorkoutController.store);
router.get('/workouts', jwtAuth, WorkoutController.showByUserId);
router.put('/workouts/:id', WorkoutController.update);
router.delete('/workouts/:id', WorkoutController.delete);


module.exports = router;