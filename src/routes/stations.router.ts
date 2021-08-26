
import express from 'express';
import * as stationsController from '../controllers/stations.contrroller';

const router = express.Router();

router.post('/creatStation/', stationsController.postStation);
router.get('/readStation/:stationNumber', stationsController.getOne);
router.get('/readStations/', stationsController.getAll);
router.patch('/updatestation/:stationNumber', stationsController.update);
router.delete('/delete/:stationNumber', stationsController.Delete);

export default router;
