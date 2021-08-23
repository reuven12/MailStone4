import {StationsModel} from '../models/station.model';
import express, {Request,Response} from 'express';
import {IStation} from '../interface/station.interface';
import mongoose from 'mongoose';

const router=express.Router();

router.post('/creatStation/',async(req:Request,res:Response)=>{
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
});

router.get('/readStation/:number_station',async(req:Request,res:Response)=>{
    try{
        const readStation:IStation=await StationsModel.findOne({number_station: req.params.number_station});
        res.send(readStation)
    }catch(err){
        res.status(500).json({message:err.message})
    }
});

router.get('/readStations/',async(req:Request,res:Response)=>{
    try{
        const readStations:IStation=await StationsModel.find();
        res.send(readStations)
    }catch(err){
        res.status(500).json({message:err.message})
    }
});

router.patch('/updatestation/:number_station',async(req:Request,res:Response)=>{

    const filter = { number_station: req.params.number_station };
    const update = { station_Name: 'giti' };      
    try{
        let update_station : IStation= await StationsModel.updateOne(filter, update);
        const a=update_station=await StationsModel.findOne(filter);
        res.send(a)
    }catch(err){
        res.status(500).json({message:err.message})
    }
});

router.delete('/delete/:number_station',async(req:Request,res:Response)=>{
    try{
    const remove :IStation =await StationsModel.remove({number_station:req.body.number_station});
    res.send('Successfully deleted'); 
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

export default router;