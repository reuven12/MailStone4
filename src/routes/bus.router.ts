
import express from 'express';
import * as busController from '../controllers/bus.controller';

const router = express.Router();

router.post('/createBus/', busController.postBus);
router.get('/readBus/:bus_color', busController.getOne);
router.get('/readBuses/', busController.getAll);
router.patch('/updateBus/:line_number', busController.update);
router.delete('/delete/:line_number', busController.Delete);
router.get('/getTime/', busController.getTime);

export default router;
