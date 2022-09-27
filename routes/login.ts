import express from 'express';
const router = express.Router();
import loginController from '../controllers/auth/loginController';

router.post('/', loginController.handleLogin);

export default router;
