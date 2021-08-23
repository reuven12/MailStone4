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
const bus_model_1 = require("../models/bus.model");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/createBus/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bus = new bus_model_1.BusesModel({
        line_number: req.body.line_number,
        bus_color: req.body.bus_color,
        model: req.body.model,
        speed: req.body.speed,
        stationsList: req.body.stationsList
    });
    try {
        const newBus = yield bus.save();
        res.status(201).json(newBus);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.get('/readBus/:bus_color', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const readBus = yield bus_model_1.BusesModel.findOne({ bus_color: req.params.bus_color });
        res.send(readBus);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
router.get('/readBuses/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const readBuses = yield bus_model_1.BusesModel.find();
        res.send(readBuses);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
router.patch('/updateBus/:line_number', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { line_number: req.params.line_number };
    const update = { model: 2005 };
    try {
        let update_bus = yield bus_model_1.BusesModel.updateOne(filter, update);
        const a = update_bus = yield bus_model_1.BusesModel.findOne(filter);
        res.send(a);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
router.delete('/delete/:line_number', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const remove = yield bus_model_1.BusesModel.remove({ line_number: req.body.line_number });
        res.send('Successfully deleted');
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
router.get('/getDistans/:line_number', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const numberLine=req.query.numberLine;
    let numberStation1 = parseInt(req.query.numberStation1);
    const numberStation2 = parseInt(req.query.numberStation2);
    const input = req.params.line_number;
    const Input = parseInt(input);
    try {
        const getDistans = yield bus_model_1.BusesModel.aggregate([{ $match: {
                    'line_number': Input
                } }, { $lookup: {
                    from: 'stations',
                    localField: 'stationsList',
                    foreignField: 'number_station',
                    as: 'stations'
                } }, { $unwind: {
                    'path': '$stations'
                } }, { $project: {
                    'localStation-x': '$stations.position_X',
                    'localStation-y': '$stations.position_Y'
                } }]);
        let Station1 = getDistans[numberStation1];
        let Station2 = getDistans[numberStation2];
        let numbers1 = Object.values(Station1);
        let numbers2 = Object.values(Station2);
        let station_Y1;
        station_Y1 = numbers1[2];
        let station_Y2;
        station_Y2 = numbers2[2];
        let Station_y;
        Station_y.push(1);
        //   console.log(station_Y);
        console.log(station_Y1);
        res.send(`num ${station_Y1}`);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
exports.default = router;
// const getDistans : IBus=await BusesModel.findOne({line_number:req.params.line_number}).lean().populate('stationsList','station_Name');
//# sourceMappingURL=bus.controller.js.map