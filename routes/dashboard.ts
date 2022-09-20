import express from 'express';
const router = express.Router();
import userController from '../controllers/userController';

router.get('/', userController.getUser);

export default router;
