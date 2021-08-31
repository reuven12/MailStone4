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

  const filter: number = parseInt(req.params.lineNumber, 10);
  const chcecker = req.body.lineNumber;
  if (!num.includes(chcecker) || filter === chcecker) {
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
  const numberLine: number = parseInt(req.body.numberLine as string, 10);
  const numberStation1: number = parseInt(
    req.body.numberStation1 as string,
    10
  );
  const numberStation2: number = parseInt(
    req.body.numberStation2 as string,
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

    const getDatailsAll = await BusesModel.aggregate([
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
        },
      },
    ]);

    const line: number[] = [];
    const numStation: number[] = [];
    const positionx: number[] = [];
    const positiony: number[] = [];
    const speed: number[] = [];
    const allStations: number[] = [];

    getDatails1.forEach((doc) => {
      numStation.push(doc.stationsNumber);
      line.push(doc.lineNumber);
      positionx.push(doc.localStationX);
      positiony.push(doc.localStationY);
      speed.push(doc.speed);
    });

    getDatails2.forEach((doc) => {
      numStation.push(doc.stationsNumber);
      line.push(doc.lineNumber);
      positionx.push(doc.localStationX);
      positiony.push(doc.localStationY);
    });

    getDatailsAll.forEach((doc) => {
      allStations.push(doc.stationsNumber);
    });

    if (!line.includes(numberLine)) {
      res.send('The line number does not exist');
    }
    if (!numStation.includes(numberStation1)) {
      res.send(
        `Station number ${numberStation1} does not exist for line ${numberLine}, the stations of line ${numberLine} are: ${allStations}`
      );
    }
    if (!numStation.includes(numberStation2)) {
      res.send(
        `Station number ${numberStation2} does not exist for line ${numberLine}, the stations of line ${numberLine} are: ${allStations}`
      );
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
