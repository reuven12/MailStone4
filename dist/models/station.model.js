"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const StationsSchema = new mongoose_1.default.Schema({
    station_Name: {
        type: String, require
    },
    number_station: {
        type: Number, require
    },
    position_X: {
        type: Number, require
    },
    position_Y: {
        type: Number, require
    }
});
exports.StationsModel = mongoose_1.default.model('stations', StationsSchema);
//# sourceMappingURL=station.model.js.map