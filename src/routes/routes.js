import express from 'express';

// Middlewares
import auth from '../middlewares/auth.js';

// Controllers
import authControllers from '../controllers/authControllers.js';
import userControllers from '../controllers/userControllers.js';
import locationControllers from '../controllers/locationControllers.js';
import placeControllers from '../controllers/placeControllers.js';

const router = express.Router();

// Auth Routes
router.post(`/register`, authControllers.register);
router.post(`/login`, authControllers.login);
router.post(`/logout`, auth, authControllers.logout);

// User Routes
router.get('/users/:user_id', auth, userControllers.getUserById);
router.put('/users/:user_id', auth, userControllers.editUserById);
router.put('/users/:user_id/password', auth, userControllers.resetPassword);

// Places/Destination Routes
router.get('/places/:place_id', auth, placeControllers.getPlaceById);
router.get('/locations/:location_id/places', auth, placeControllers.getPlacesByLocationId);

// Location/City Routes
router.get('/locations', auth, locationControllers.getAllLocations);
router.get('/locations/:location_id', auth, locationControllers.getLocationById);

export default router;
