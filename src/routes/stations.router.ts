
import express from 'express';
import * as stationsController from '../controllers/stations.contrroller';

const router = express.Router();

router.post('/creatStation/', stationsController.postStation);
router.get('/readStation/:number_station', stationsController.getOne);
router.get('/readStations/', stationsController.getAll);
router.patch('/updatestation/:number_station', stationsController.update);
router.delete('/delete/:number_station', stationsController.Delete);

export default router;
