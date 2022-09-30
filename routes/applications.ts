import express from 'express';
const router = express.Router();
import applicationController from '../controllers/applicationController';

router.get('/', applicationController.getApplications);

export default router;
