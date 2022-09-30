import express from 'express';
const router = express.Router();
import eventController from '../controllers/eventController';

router.get('/', eventController.getEvents);

export default router;
