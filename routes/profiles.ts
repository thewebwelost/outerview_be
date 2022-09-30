import express from 'express';
const router = express.Router();
import profileController from '../controllers/profileController';

router.get('/', profileController.getProfiles);

export default router;
