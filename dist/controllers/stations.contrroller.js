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
const ruter = express_1.default.Router();
ruter.post('/creatStation/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.default = ruter;
//# sourceMappingURL=stations.contrroller.js.map