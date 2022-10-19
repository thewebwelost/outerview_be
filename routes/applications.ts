import express from 'express';
const router = express.Router();
import applicationController from '../controllers/applicationController';

router.post('/', applicationController.getAll);
router.post('/get', applicationController.getOne);
router.post('/add', applicationController.add);
router.post('/update', applicationController.update);
router.post('/delete', applicationController.deleteOne);

export default router;
