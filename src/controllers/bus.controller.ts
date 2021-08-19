import {BusesModel} from '../models/bus.model';
import express, {Request,Response} from 'express';
import {IBus} from '../interface/bus.interface';


const router=express.Router();

router.post('/createBus/', async(req:Request,res:Response)=>{
    const bus=new BusesModel({
        line_number:req.body.line_number,
        bus_color:req.body.bus_color,
        model:req.body.model,
        speed:req.body.speed,
        List_station:req.body.List_station
    })
    try{
        const newBus= await bus.save();
        res.status(201).json(newBus);
    }catch(err){
        res.status(400).json({message:err.message}) 
    }
});

router.get('/readBus/:line_number',async(req:Request,res:Response)=>{
    try{
        const readBus:IBus=await BusesModel.findOne({line_number: req.params.line_number});
        res.send(readBus)
    }catch(err){
        res.status(500).json({message:err.message})
    }
});

router.get('/readBuses/',async(req:Request,res:Response)=>{
    try{
        const readBuses:IBus=await BusesModel.find();
        res.send(readBuses)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.patch('/updateBus/:update',async(req:Request,res:Response)=>{
    try{
        const update_bus : IBus= await BusesModel.findByIdAndUpdate({line_number:49, model:1800});
        res.send(update_bus)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})


export default router;