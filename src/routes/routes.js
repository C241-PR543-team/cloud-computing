import express from 'express';

// Middlewares
import auth from '../middlewares/auth.js';

// Controllers
import authControllers from '../controllers/authControllers.js';
import userControllers from '../controllers/userControllers.js';

const router = express.Router();

// Auth Routes
router.post(`/register`, authControllers.register);
router.post(`/login`, authControllers.login);
router.post(`/logout`, auth, authControllers.logout);

// User Routes
router.get('/users/:user_id', auth, userControllers.userDetails);
router.put('/users/:user_id', auth, userControllers.updateUserDetails);
router.put('/users/:user_id/password', auth, userControllers.resetPassword);

export default router;
