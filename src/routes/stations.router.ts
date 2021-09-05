import express from 'express';
import * as stationsController from '../controllers/stations.contrroller';

const router = express.Router();

router.post('/creatStation/', stationsController.postStation);
router.get('/readStation/:stationNumber', stationsController.getStation);
router.get('/readStations/', stationsController.getStations);
router.patch('/updatestation/:stationNumber', stationsController.editStation);
router.delete('/delete/:stationNumber', stationsController.delStation);

export default router;
