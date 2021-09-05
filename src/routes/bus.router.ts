import express from 'express';
import * as busController from '../controllers/bus.controller';

const router = express.Router();

router.post('/createBus/', busController.postBus);
router.get('/readBus/', busController.getBus);
router.get('/readBuses/', busController.getBuses);
router.patch('/updateBus/:lineNumber', busController.editBus);
router.delete('/delete/:lineNumber', busController.delBus);
router.get('/getTime/', busController.getTime);

export default router;
