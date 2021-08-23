import {BusesModel} from '../models/bus.model';
import express, {Request,Response} from 'express';
import {IBus} from '../interface/bus.interface';
import mongoose from 'mongoose';

const router=express.Router();

router.post('/createBus/', async(req:Request,res:Response)=>{
    const bus=new BusesModel({
        line_number:req.body.line_number,
        bus_color:req.body.bus_color,
        model:req.body.model,
        speed:req.body.speed,
        stationsList:req.body.stationsList
    })
    try{
        const newBus= await bus.save();
        res.status(201).json(newBus);
    }catch(err){
        res.status(400).json({message:err.message}) 
    }
});

router.get('/readBus/:bus_color',async(req:Request,res:Response)=>{
    try{
        const readBus:IBus=await BusesModel.findOne({bus_color: req.params.bus_color});
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
});

router.patch('/updateBus/:line_number',async(req:Request,res:Response)=>{

    const filter = { line_number: req.params.line_number };
    const update = { model: 2005 };      
    try{
        let update_bus : IBus= await BusesModel.updateOne(filter, update);
        const a=update_bus=await BusesModel.findOne(filter);
        res.send(a)
    }catch(err){
        res.status(500).json({message:err.message})
    }
});
router.delete('/delete/:line_number',async(req:Request,res:Response)=>{
    try{
    const remove :IBus =await BusesModel.remove({line_number:req.body.line_number});
    res.send('Successfully deleted'); 
    }catch(err){
        res.status(500).json({message:err.message})
    }
})


router.get('/getDistans/:line_number', async(req:Request,res:Response)=>{
    const numberLine:number=parseInt(req.query.numberLine as string);
    let numberStation1:number= parseInt (req.query.numberStation1 as string);
    const numberStation2:number=parseInt(req.query.numberStation2 as string);


    try{
        const getDistans=await BusesModel.aggregate([{$match: {
            'line_number':numberLine
          }}, {$lookup: {
            from: 'stations',
            localField: 'stationsList',
            foreignField: 'number_station',
            as: 'stations'
          }}, {$unwind: {
            'path': '$stations'
          }}, {$project: {
            'localStation-x':'$stations.position_X',
            'localStation-y':'$stations.position_Y',
            'speed':'$speed'
          }}])
    
          let Station1:number =getDistans[numberStation1];
          let Station2:number =getDistans[numberStation2];

          let numbers1: number [] =Object.values(Station1);
          let numbers2: number [] =Object.values(Station2);

          
          let station_x1:number;
          station_x1=numbers1[1];
          let station_x2:number;
          station_x2=numbers2[1];
          
          let Station_X : number[] = [];
          Station_X.push(station_x1,station_x2)
        //   console.log(Station_X);
          
          let station_y1:number;
          station_y1=numbers1[2];
          let station_y2:number;
          station_y2=numbers2[2];
  
          let Station_Y : number[] = [];
          Station_Y.push(station_y1,station_y2)
        //   console.log(Station_Y);

          let speed: number [] =Object.values(Station1);
          let Speed:number;
          Speed=speed[3]
             
          const mathX=Station_X[0]-Station_X[1];
          const mathY=Station_Y[0]-Station_Y[1];
          const distance=Math.sqrt(mathX*mathX+mathY*mathY);
          const time=distance/Speed;
          res.send(`The distance between the stations is: ${distance} km, and Travel time is: ${time} hr.`);

        }catch(err){
        res.status(500).json({message:err.message}) 
    }
})

export default router;









