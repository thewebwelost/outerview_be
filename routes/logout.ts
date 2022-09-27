import express from 'express';
const router = express.Router();
import logoutController from '../controllers/auth/logoutController';

router.get('/', logoutController.handleLogout);

export default router;
