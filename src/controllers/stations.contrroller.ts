// import { Request, Response } from 'express';
// import StationsModel from '../models/station.model';
// import { IStation } from '../interface/station.interface';

// export const postStation = async (req: Request, res: Response) => {
//   const stationNum = await StationsModel.aggregate([
//     {
//       $project: {
//         stationNumber: '$stationNumber',
//       },
//     },
//   ]);
//   const num: number[] = [];
//   stationNum.forEach((doc) => {
//     num.push(doc.stationNumber);
//   });

//   const station = new StationsModel({
//     stationName: req.body.stationName,
//     stationNumber: req.body.stationNumber,
//     positionX: req.body.positionX,
//     positionY: req.body.positionY,
//   });
//   const chck: number = req.body.stationNumber;
//   if (!num.includes(chck)) {
//     try {
//       const newStation = await station.save();
//       return res.status(200).json(newStation);
//     } catch (err) {
//       return err;
//     }
//   } else {
//     return res.send('The station number exists');
//   }
// };

// export const getOne = async (req: Request, res: Response) => {
//   try {
//     const readStation: IStation = await StationsModel.findOne({
//       stationNumber: req.params.stationNumber,
//     });
//     return res.send(readStation);
//   } catch (err) {
//     return err;
//   }
// };

// export const getAll = async (_req: Request, res: Response) => {
//   try {
//     const readStations: IStation = await StationsModel.find();
//     return res.send(readStations);
//   } catch (err) {
//     return err;
//   }
// };

// export const update = async (req: Request, res: Response) => {
//   const stationNum = await StationsModel.aggregate([
//     {
//       $project: {
//         stationNumber: '$stationNumber',
//       },
//     },
//   ]);
//   const num: number[] = [];
//   stationNum.forEach((doc) => {
//     num.push(doc.stationNumber);
//   });
//   const filter: number = parseInt(req.params.stationNumber, 10);
//   const chcecker = req.body.stationNumber;

//   if (!num.includes(chcecker) || filter === chcecker) {
//     try {
//       const Updated: IStation = await StationsModel.updateOne(
//         { stationNumber: req.params.stationNumber },
//         {
//           stationName: req.body.stationName,
//           stationNumber: req.body.stationNumber,
//           positionX: req.body.positionX,
//           positionY: req.body.positionY,
//         }
//       );
//       console.log(Updated);

//       return res.send('successfully updated');
//     } catch (err) {
//       return err;
//     }
//   } else {
//     return res.send('This station number exists Try another number');
//   }
// };

// export const Delete = async (req: Request, res: Response) => {
//   try {
//     const remove: IStation = await StationsModel.remove({
//       stationNumber: req.params.stationNumber,
//     });
//     return res.send(remove);
//   } catch (err) {
//     return err;
//   }
// };

import { Request, Response } from 'express';
// import { IStation } from '../interface/station.interface';
import * as stationManagr from '../managers/station.manager';

export const postStation = async (req: Request, res: Response) => {
  try {
    const chck: number = req.body.stationNumber;
    if (await stationManagr.validStation(chck)) {
      res.send('This station already exists Select another station');
    } else {
      const station = {
        stationName: req.body.stationName,
        stationNumber: req.body.stationNumber,
        positionX: req.body.positionX,
        positionY: req.body.positionY,
      };

      const addStation = await stationManagr.postStation(station);
      res.send(addStation);
    }
  } catch (err) {
    res.send('error');
  }
};

export const getStation = async (req: Request, res: Response) => {
  try {
    const lineStation: number = parseInt(
      req.params.stationNumber as string,
      10
    );
    const station = await stationManagr.getStation(lineStation);

    res.send(station);
  } catch (err) {
    res.send('error');
  }
};

export const getStations = async (_req: Request, res: Response) => {
  try {
    const station = await stationManagr.getStations();

    res.send(station);
  } catch (err) {
    res.send('error');
  }
};

export const editStation = async (req: Request, res: Response) => {
  try {
    const filter: number = parseInt(req.params.stationNumber as string, 10);
    const chcecker = req.body.stationNumber;
    if (await stationManagr.validEdit(chcecker, filter)) {
      res.send('This line already exists Select another line ');
    } else {
      const updateStation: number = parseInt(
        req.params.stationNumber as string,
        10
      );
      const station = {
        stationName: req.body.stationName,
        stationNumber: req.body.stationNumber,
        positionX: req.body.positionX,
        positionY: req.body.positionY,
      };

      const printEdit = await stationManagr.updateStation(
        updateStation,
        station
      );

      res.status(201).json(printEdit);
    }
  } catch (err) {
    res.send('error');
  }
};

export const delStation = async (req: Request, res: Response) => {
  try {
    const delstation: number = parseInt(req.params.stationNumber as string, 10);
    const deleted = await stationManagr.deleteStation(delstation);
    res.status(200).send(deleted);
  } catch (err) {
    res.send('error');
  }
};
