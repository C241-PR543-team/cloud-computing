import express from 'express';

// Middlewares
import auth from '../middlewares/auth.js';

// Controllers
import authControllers from '../controllers/authControllers.js';
import userControllers from '../controllers/userControllers.js';
import locationControllers from '../controllers/locationControllers.js'
import predictionControllers from '../controllers/predictionControllers.js';

const router = express.Router();

// Auth Routes
router.post(`/register`, authControllers.register);
router.post(`/login`, authControllers.login);
router.post(`/logout`, auth, authControllers.logout);

// User Routes
router.get('/users/:user_id', auth, userControllers.userDetails);
router.put('/users/:user_id', auth, userControllers.updateUserDetails);
router.put('/users/:user_id/password', auth, userControllers.resetPassword);

// Places Routes


// Location Routes
router.get('/locations/:location_id', auth, locationControllers.locationDetails);

// Prediction (test)
// router.post('/predict', predictionControllers.predict);

export default router;
