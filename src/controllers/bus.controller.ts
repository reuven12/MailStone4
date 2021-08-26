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
    const getDistans = await BusesModel.aggregate([
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
          'localStation-x': '$stations.positionX',
          'localStation-y': '$stations.positionY',
          speed: '$speed',
        },
      },
    ]);
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

    if (!num.includes(numberLine)) {
      return res.send('The line number does not exist');
    }
    const Station1: number = getDistans[numberStation1];
    const Station2: number = getDistans[numberStation2];

    const numbers1: number[] = Object.values(Station1);
    const numbers2: number[] = Object.values(Station2);

    const stationx1: number = numbers1[1];
    const stationx2: number = numbers2[1];

    const StationX: number[] = [];
    StationX.push(stationx1, stationx2);

    const stationy1: number = numbers1[2];
    const stationy2: number = numbers2[2];

    const StationY: number[] = [];
    StationY.push(stationy1, stationy2);

    const speed: number[] = Object.values(Station1);
    const Speed: number = speed[3];

    const mathX = StationX[0] - StationX[1];
    const mathY = StationY[0] - StationY[1];
    const distance = Math.sqrt(mathX * mathX + mathY * mathY);
    const time = distance / Speed;
    return res.send(
      `The distance between the stations is: ${distance} km, and Travel time is: ${time} hr.`
    );
  } catch (err) {
    return res.send(err);
  }
};











// const stationsNum = await BusesModel.aggregate([
//   {
//     $match: {
//       lineNumber: numberLine,
//     },
//   },
//   {
//     $project: {
//       stationsList: '$stationsList',
//     },
//   },
//   {
//     $unwind: {
//       path: '$stationsList',
//     },
//   },
// ]);
// const stations: number[] = [];
// stationsNum.forEach((doc) => {
//   stations.push(doc.path);
// });

// console.log(stations);
