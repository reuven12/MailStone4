"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const station_model_1 = require("../models/station.model");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/creatStation/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const station = new station_model_1.StationsModel({
        station_Name: req.body.station_Name,
        number_station: req.body.number_station,
        position_X: req.body.position_X,
        position_Y: req.body.position_Y
    });
    try {
        const newStation = yield station.save();
        res.status(200).json(newStation);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.get('/readStation/:number_station', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const readStation = yield station_model_1.StationsModel.findOne({ number_station: req.params.number_station });
        res.send(readStation);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
router.get('/readStations/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const readStations = yield station_model_1.StationsModel.find();
        res.send(readStations);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
router.patch('/updatestation/:number_station', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { number_station: req.params.number_station };
    const update = { station_Name: 'giti' };
    try {
        let update_station = yield station_model_1.StationsModel.updateOne(filter, update);
        const a = update_station = yield station_model_1.StationsModel.findOne(filter);
        res.send(a);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
router.delete('/delete/:number_station', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const remove = yield station_model_1.StationsModel.remove({ number_station: req.body.number_station });
        res.send('Successfully deleted');
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
exports.default = router;
//# sourceMappingURL=stations.contrroller.js.map