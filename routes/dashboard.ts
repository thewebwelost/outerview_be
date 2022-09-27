import express from 'express';
const router = express.Router();
import dashboardController from '../controllers/dashboardController';

router.get('/', dashboardController.getDashboard);

export default router;
