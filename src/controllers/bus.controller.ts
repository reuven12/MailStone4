
import { Request, Response } from 'express';
import { BusesModel } from '../models/bus.model';
import { IBus } from '../interface/bus.interface';

export const postBus = async (req: Request, res: Response) => {
  const line_num = await BusesModel.aggregate([
    {
      $project: {
        line_number: '$line_number',
      },
    },
  ]);
  const num: number[] = [];
  line_num.forEach((doc) => {
    num.push(doc.line_number);
  });

  const bus = new BusesModel({
    line_number: req.body.line_number,
    bus_color: req.body.bus_color,
    model: req.body.model,
    speed: req.body.speed,
    stationsList: req.body.stationsList,
  });
  const chck: any = req.body.line_number;
  if (!num.includes(chck)) {
    try {
      const newBus = await bus.save();
      return res.status(201).json(newBus);
    } catch (err) {
      return err;
    }
  } else {
    return res.send('The line number exists');
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const readBus: IBus = await BusesModel.findOne({
      bus_color: req.params.bus_color,
    });
    return res.send(readBus);
  } catch (err) {
    return err;
  }
};

export const getAll = async (res: Response) => {
  try {
    const readBuses: IBus = await BusesModel.find();
    return res.send(readBuses);
  } catch (err) {
    return err;
  }
};

export const update = async (req: Request, res: Response) => {
  const line_num = await BusesModel.aggregate([
    {
      $project: {
        line_number: '$line_number',
      },
    },
  ]);
  const num: number[] = [];
  line_num.forEach((doc) => {
    num.push(doc.line_number);
  });

  const filter1 ={line_number:req.params.line_number};
  const filter:string[] = Object.values(filter1);
  const chc= req.body.line_number;
  
  
  if (!num.includes(chc)||filter==chc) {
    try {
      const Updated:IBus = await BusesModel.updateOne({line_number: req.body.line_number},
   {
    model: req.body.model,
    line_number: req.body.line_number,
    bus_color: req.body.bus_color,
    speed: req.body.speed,
  });
console.log(Updated);

      return res.send('successfully updated');
    } catch (err) {
      return err;
    }
  } else{
    return res.send('This line number exists Try another number');
  }
};


export const Delete = async (req: Request, res: Response) => {
  try {
    const remove: IBus = await BusesModel.remove({
      line_number: req.body.line_number,
    });
    return res.send(remove);
  } catch (err) {
    return err;
  }
};

export const getTime = async (req: Request, res: Response) => {
  const numberLine: number = parseInt(req.query.numberLine as string);
  const numberStation1: number = parseInt(req.query.numberStation1 as string);
  const numberStation2: number = parseInt(req.query.numberStation2 as string);

  try {
    const getDistans = await BusesModel.aggregate([
      {
        $match: {
          line_number: numberLine,
        },
      },
      {
        $lookup: {
          from: 'stations',
          localField: 'stationsList',
          foreignField: 'number_station',
          as: 'stations',
        },
      },
      {
        $unwind: {
          path: '$stations',
        },
      },
      {
        $project: {
          'localStation-x': '$stations.position_X',
          'localStation-y': '$stations.position_Y',
          speed: '$speed',
        },
      },
    ]);

    const Station1: number = getDistans[numberStation1];
    const Station2: number = getDistans[numberStation2];

    const numbers1: number[] = Object.values(Station1);
    const numbers2: number[] = Object.values(Station2);

    let station_x1: number;
    station_x1 = numbers1[1];
    let station_x2: number;
    station_x2 = numbers2[1];

    const Station_X: number[] = [];
    Station_X.push(station_x1, station_x2);

    let station_y1: number;
    station_y1 = numbers1[2];
    let station_y2: number;
    station_y2 = numbers2[2];

    const Station_Y: number[] = [];
    Station_Y.push(station_y1, station_y2);

    const speed: number[] = Object.values(Station1);
    let Speed: number;
    Speed = speed[3];

    const mathX = Station_X[0] - Station_X[1];
    const mathY = Station_Y[0] - Station_Y[1];
    const distance = Math.sqrt(mathX * mathX + mathY * mathY);
    const time = distance / Speed;
    return res.send(
      `The distance between the stations is: ${distance} km, and Travel time is: ${time} hr.`
    );
  } catch (err) {
    return res.send('The line or station does not exist');
  }
};
