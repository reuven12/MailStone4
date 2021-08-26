import express from 'express';
import * as busController from '../controllers/bus.controller';

const router = express.Router();

router.post('/createBus/', busController.postBus);
router.get('/readBus/:busColor', busController.getOne);
router.get('/readBuses/', busController.getAll);
router.patch('/updateBus/:lineNumber', busController.update);
router.delete('/delete/:lineNumber', busController.Delete);
router.get('/getTime/', busController.getTime);

export default router;
