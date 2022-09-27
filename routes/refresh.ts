import express from 'express';
const router = express.Router();
import refreshTokenController from '../controllers/auth/refreshTokenController';

router.get('/', refreshTokenController.handleRefreshToken);

export default router;
