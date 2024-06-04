import express from 'express';
import authControllers from '../controllers/authControllers.js';

import auth from '../middlewares/auth.js';

const router = express.Router();

router.post(`/register`, authControllers.register);
router.post(`/login`, authControllers.login);
router.post(`/logout`, authControllers.logout);

export default router;
