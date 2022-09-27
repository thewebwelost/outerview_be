import express from 'express';
const router = express.Router();
import registerController from '../controllers/auth/registerController';

router.post('/', registerController.createUser);

export default router;
