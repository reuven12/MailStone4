import { Request, Response } from 'express';
import * as stationManagr from '../managers/station.manager';

export const postStation = async (req: Request, res: Response) => {
  try {
    const chck: number = req.body.stationNumber;
    const positionx: number = req.body.positionX;
    const positiony: number = req.body.positionY;
    if (await stationManagr.validStation(chck)) {
      res.send(
        'This number station already exists Select another number station'
      );
    } else if (await stationManagr.validPosition(positionx, positiony)) {
      res.send('This position already exists Select another position');
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
    res.send(deleted);
  } catch (err) {
    res.send('error');
  }
};
