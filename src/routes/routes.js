import express from 'express';
import authControllers from '../controllers/authControllers.js';

import auth from '../middlewares/auth.js';

const router = express.Router();
const route = "/moove";

router.post(`${route}/register`, authControllers.register);
router.post(`${route}/login`, authControllers.login);
router.post(`${route}/logout`, authControllers.logout);

export default router;