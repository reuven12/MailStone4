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
        List_station: req.body.List_station
    });
    try {
        const newBus = yield bus.save();
        res.status(201).json(newBus);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.get('/readBus/:line_number', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const readBus = yield bus_model_1.BusesModel.findOne({ line_number: req.params.line_number });
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
router.patch('/updateBus/:update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update_bus = yield bus_model_1.BusesModel.findByIdAndUpdate({ line_number: 49, model: 1800 });
        res.send(update_bus);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
exports.default = router;
//# sourceMappingURL=bus.controller.js.map