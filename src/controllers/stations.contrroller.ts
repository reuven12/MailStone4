/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { Request, Response } from 'express';
import { StationsModel } from '../models/station.model';
import { IStation } from '../interface/station.interface';

export const postStation = async (req: Request, res: Response) => {
  const station_num = await StationsModel.aggregate([
    {
      $project: {
        number_station: '$number_station',
      },
    },
  ]);
  const num: number[] = [];
  station_num.forEach((doc) => {
    num.push(doc.line_number);
  });

  const station = new StationsModel({
    station_Name: req.body.station_Name,
    number_station: req.body.number_station,
    position_X: req.body.position_X,
    position_Y: req.body.position_Y,
  });
  const chck: any = req.body.number_station;
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
      number_station: req.params.number_station,
    });
    return res.send(readStation);
  } catch (err) {
    return err;
  }
};

export const getAll = async (res: Response) => {
  try {
    const readStations: IStation = await StationsModel.find();
    return res.send(readStations);
  } catch (err) {
    return err;
  }
};

export const update = async (req: Request, res: Response) => {
  const station_num = await StationsModel.aggregate([
    {
      $project: {
        number_station: '$number_station',
      },
    },
  ]);
  const num: number[] = [];
  station_num.forEach((doc) => {
    num.push(doc.line_number);
  });

  const filter = { number_station: req.params.number_station };

  let update_station: IStation = await StationsModel.updateOne(filter);
  console.log(update_station);
  const a = {
    station_Name: req.body.station_Name,
    number_station: req.body.number_station,
    position_X: req.body.position_X,
    position_Y: req.body.position_Y,
  };
  const chck: any = req.body.number_station;
  if (!num.includes(chck)) {
    try {
      const Updated = (update_station = await StationsModel.findOne(a));
      return res.send(Updated);
    } catch (err) {
      return err;
    }
  } else {
    return res.send('The station number exists');
  }
};

export const Delete = async (req: Request, res: Response) => {
  try {
    const remove: IStation = await StationsModel.remove({
      number_station: req.body.number_station,
    });
    return res.send(remove);
  } catch (err) {
    return err;
  }
};
