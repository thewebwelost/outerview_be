import express from 'express';
const router = express.Router();
import profileController from '../controllers/profileController';

// TODO: probably worth passing user/profile id as query param and change to get?

router.post('/', profileController.getAll);
router.post('/get', profileController.getOne);
router.post('/add', profileController.add);
router.post('/update', profileController.update);
router.post('/delete', profileController.deleteOne);

export default router;
