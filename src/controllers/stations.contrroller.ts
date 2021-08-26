import { Request, Response } from 'express';
import { StationsModel } from '../models/station.model';
import { IStation } from '../interface/station.interface';

export const postStation = async (req: Request, res: Response) => {
  const stationNum = await StationsModel.aggregate([
    {
      $project: {
        stationNumber: '$stationNumber',
      },
    },
  ]);
  const num: number[] = [];
  stationNum.forEach((doc) => {
    num.push(doc.stationNumber);
  });

  const station = new StationsModel({
    stationName: req.body.stationName,
    stationNumber: req.body.stationNumber,
    positionX: req.body.positionX,
    positionY: req.body.positionY,
  });
  const chck: number = req.body.stationNumber;
  if (!num.includes(chck)) {
    try {
      const newStation = await station.save();
      return res.status(200).json(newStation);
    } catch (err) {
      return err;
    }
  } else {
    return res.send('The station number exists');
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const readStation: IStation = await StationsModel.findOne({
      stationNumber: req.params.stationNumber,
    });
    return res.send(readStation);
  } catch (err) {
    return err;
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const readStations: IStation = await StationsModel.find();
    return res.send(readStations);
  } catch (err) {
    return err;
  }
};

export const update = async (req: Request, res: Response) => {
  const stationNum = await StationsModel.aggregate([
    {
      $project: {
        stationNumber: '$stationNumber',
      },
    },
  ]);
  const num: number[] = [];
  stationNum.forEach((doc) => {
    num.push(doc.stationNumber);
  });
  const filter1 = { stationNumber: req.params.stationNumber };
  const filter: string[] = Object.values(filter1);
  const chc = req.body.stationNumber;

  // eslint-disable-next-line eqeqeq
  if (!num.includes(chc) || filter == chc) {
    try {
      const Updated: IStation = await StationsModel.updateOne(
        { stationNumber: req.params.stationNumber },
        {
          stationName: req.body.stationName,
          stationNumber: req.body.stationNumber,
          positionX: req.body.positionX,
          positionY: req.body.positionY,
        }
      );
      console.log(Updated);

      return res.send('successfully updated');
    } catch (err) {
      return err;
    }
  } else {
    return res.send('This station number exists Try another number');
  }
};

export const Delete = async (req: Request, res: Response) => {
  try {
    const remove: IStation = await StationsModel.remove({
      stationNumber: req.params.stationNumber,
    });
    return res.send(remove);
  } catch (err) {
    return err;
  }
};
