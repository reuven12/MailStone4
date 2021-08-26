// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose from 'mongoose';
import express from 'express';
import Buses from './routes/bus.router';
import Stations from './routes/stations.router';

require('dotenv').config();

const app = express();

mongoose.connect('mongodb://localhost:27017/MongoTasck', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error: Error) => console.error(error));
db.once('open', () => console.log('connect'));

app.use(express.json());
app.use('/stations', Stations);
app.use('/buses', Buses);

const port = process.env.PORT;
app.listen(port);
