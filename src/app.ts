import mongoose from 'mongoose';
import express from 'express';
import Buses from './routes/bus.router';
import Stations from './routes/stations.router';

require('dotenv').config();

const app = express();

const port = process.env.PORT;
const mongoip = process.env.MONGOIP;
const mongoport = process.env.MONGOPORT;
const dataBase = process.env.DATABASE;

mongoose.connect(`mongodb://${mongoip}:${mongoport}/${dataBase}`, {});

const db = mongoose.connection;
db.on('error', (error: Error) => console.error(error));
db.once('open', () => console.log('connect'));

app.use(express.json());
app.use('/api/stations', Stations);
app.use('/api/buses', Buses);

app.listen(port);
