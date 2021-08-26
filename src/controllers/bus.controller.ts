/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
import { Request, Response } from 'express';
import { BusesModel } from '../models/bus.model';
import { IBus } from '../interface/bus.interface';

export const postBus = async (req: Request, res: Response) => {
  const lineNum = await BusesModel.aggregate([
    {
      $project: {
        lineNumber: '$lineNumber',
      },
    },
  ]);
  const num: number[] = [];
  lineNum.forEach((doc) => {
    num.push(doc.lineNumber);
  });

  const bus = new BusesModel({
    lineNumber: req.body.lineNumber,
    busColor: req.body.busColor,
    model: req.body.model,
    speed: req.body.speed,
    stationsList: req.body.stationsList,
  });
  const chck: number = req.body.lineNumber;
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
      busColor: req.params.busColor,
    });
    return res.send(readBus);
  } catch (err) {
    return err;
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const readBuses: IBus = await BusesModel.find();
    return res.send(readBuses);
  } catch (err) {
    return err;
  }
};

export const update = async (req: Request, res: Response) => {
  const lineNum = await BusesModel.aggregate([
    {
      $project: {
        lineNumber: '$lineNumber',
      },
    },
  ]);
  const num: number[] = [];
  lineNum.forEach((doc) => {
    num.push(doc.lineNumber);
  });

  const filter1 = { lineNumber: req.params.lineNumber };
  const filter: string[] = Object.values(filter1);
  const chc = req.body.lineNumber;

  // eslint-disable-next-line eqeqeq
  if (!num.includes(chc) || filter == chc) {
    try {
      const Updated: IBus = await BusesModel.updateOne(
        { lineNumber: req.body.lineNumber },
        {
          model: req.body.model,
          lineNumber: req.body.lineNumber,
          busColor: req.body.busColor,
          speed: req.body.speed,
        }
      );
      console.log(Updated);

      return res.send('successfully updated');
    } catch (err) {
      return err;
    }
  } else {
    return res.send('This line number exists Try another number');
  }
};

export const Delete = async (req: Request, res: Response) => {
  try {
    const remove: IBus = await BusesModel.remove({
      lineNumber: req.params.lineNumber,
    });
    return res.send(remove);
  } catch (err) {
    return err;
  }
};

export const getTime = async (req: Request, res: Response) => {
  // let Station1: number = 0;
  // let Station2: number = 0;

  const numberLine: number = parseInt(req.query.numberLine as string, 10);
  const numberStation1: number = parseInt(
    req.query.numberStation1 as string,
    10
  );
  const numberStation2: number = parseInt(
    req.query.numberStation2 as string,
    10
  );

  try {
    const getDatails1 = await BusesModel.aggregate([
      {
        $match: {
          lineNumber: numberLine,
        },
      },
      {
        $lookup: {
          from: 'stations',
          localField: 'stationsList',
          foreignField: 'stationNumber',
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
          stationsNumber: '$stations.stationNumber',
          localStationX: '$stations.positionX',
          localStationY: '$stations.positionY',
          speed: '$speed',
          lineNumber: '$lineNumber',
        },
      },
      {
        $match: {
          stationsNumber: numberStation1,
        },
      },
    ]);

    const getDatails2 = await BusesModel.aggregate([
      {
        $match: {
          lineNumber: numberLine,
        },
      },
      {
        $lookup: {
          from: 'stations',
          localField: 'stationsList',
          foreignField: 'stationNumber',
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
          stationsNumber: '$stations.stationNumber',
          localStationX: '$stations.positionX',
          localStationY: '$stations.positionY',
          speed: '$speed',
          lineNumber: '$lineNumber',
        },
      },
      {
        $match: {
          stationsNumber: numberStation2,
        },
      },
    ]);

    const num: number[] = [];
    const numStation: number[] = [];
    const positionx: number[] = [];
    const positiony: number[] = [];
    const speed: number[] = [];

    getDatails1.forEach((doc) => {
      numStation.push(doc.stationsNumber);
      num.push(doc.lineNumber);
      positionx.push(doc.localStationX);
      positiony.push(doc.localStationY);
      speed.push(doc.speed);
    });

    getDatails2.forEach((doc) => {
      numStation.push(doc.stationsNumber);
      num.push(doc.lineNumber);
      positionx.push(doc.localStationX);
      positiony.push(doc.localStationY);
    });

    if (!num.includes(numberLine)) {
      res.send('The line number does not exist');
    }
    if (!numStation.includes(numberStation1)) {
      res.send('The station1 number does not exist');
    }
    if (!numStation.includes(numberStation2)) {
      res.send('The station2 number does not exist');
    }

    const distance = Math.sqrt(
      positionx[0] * positionx[1] + positiony[0] * positiony[1]
    );

    const time = distance / speed[0];
    res.send(
      `The distance between the stations is: ${distance} km, and Travel time is: ${time} hr.`
    );
  } catch (err) {
    res.send(err);
  }
};
