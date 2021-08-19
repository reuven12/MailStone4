"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const bus_controller_1 = __importDefault(require("./controllers/bus.controller"));
const stations_contrroller_1 = __importDefault(require("./controllers/stations.contrroller"));
mongoose_1.default.connect('mongodb://localhost:27017/MongoTasck', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose_1.default.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connect'));
app.use(express_1.default.json());
app.use('/stations', stations_contrroller_1.default);
app.use('/buses', bus_controller_1.default);
let port = process.env.PORT || '3005';
app.listen(port);
//# sourceMappingURL=app.js.map