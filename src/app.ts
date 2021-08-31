// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose from 'mongoose';
import express from 'express';
import Buses from './routes/bus.router';
import Stations from './routes/stations.router';

require('dotenv').config();

const app = express();

const port = process.env.PORT;
const mongoip = process.env.MONGOIP;
const mongoport = process.env.MONGOPORT;

mongoose.connect(`mongodb://${mongoip}:${mongoport}/MongoTasck`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error: Error) => console.error(error));
db.once('open', () => console.log('connect'));

app.use(express.json());
app.use('/api/stations', Stations);
app.use('/api/buses', Buses);

app.listen(port);
