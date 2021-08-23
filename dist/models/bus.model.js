"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusesModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const busesSchema = new mongoose_1.default.Schema({
    line_number: {
        type: Number,
        require: true,
    },
    bus_color: {
        type: String,
        require: true,
    },
    model: {
        type: Number,
        require: true,
    },
    speed: {
        type: Number
    },
    getDistans: {
        type: String
    },
    stationsList: [{
            type: Number,
            ref: 'stations'
        }]
}, { versionKey: false });
exports.BusesModel = mongoose_1.default.model('buses', busesSchema);
//# sourceMappingURL=bus.model.js.map