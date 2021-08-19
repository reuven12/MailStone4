import {StationsModel} from '../models/station.model';
import express, {Request,Response} from 'express';
import {IStation} from '../interface/station.interface';

const ruter=express.Router();

ruter.post('/creatStation/',async(req:Request,res:Response)=>{
    const station=new StationsModel({
        
        station_Name:req.body.station_Name,
        number_station:req.body.number_station,
        position_X:req.body.position_X,
        position_Y:req.body.position_Y
    })
    try{
        const newStation=await station.save();
        res.status(200).json(newStation);

    }catch(err){
        res.status(400).json({message:err.message})
    }
})

export default ruter;