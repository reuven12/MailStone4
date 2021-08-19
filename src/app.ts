import mongoose from 'mongoose';
import express from 'express';
const app=express();
import Buses from './controllers/bus.controller';
import Stations from './controllers/stations.contrroller';


mongoose.connect('mongodb://localhost:27017/MongoTasck',
 {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', (error:Error)=>console.error(error));
db.once('open', ()=> console.log('connect'));

app.use(express.json());
app.use('/stations',Stations);
app.use('/buses',Buses);

let port=process.env.PORT || '3005';
app.listen(port);


