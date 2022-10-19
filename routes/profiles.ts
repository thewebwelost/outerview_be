import express from 'express';
const router = express.Router();
import profileController from '../controllers/profileController';

router.post('/', profileController.getProfiles); // TODO: probably worth passing userId as query param and change to get?
router.post('/getProfile', profileController.getProfile);
router.post('/addProfile', profileController.addProfile);

export default router;
