import mongoose from 'mongoose';


const StationsSchema=new mongoose.Schema({
    station_Name:{
        type:String,require
    },
    number_station:{
        type:Number,require
    },
    position_X:{
        type:Number,require
    },
    position_Y:{
        type:Number,require
    }
})

export const StationsModel=mongoose.model('stations',StationsSchema)