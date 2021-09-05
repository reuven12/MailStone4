import { Request, Response } from 'express';
import * as busManagr from '../managers/bus.manager';

export const postBus = async (req: Request, res: Response) => {
  try {
    const chck: number = req.body.lineNumber;
    if (await busManagr.validBus(chck)) {
      res.send('This line already exists Select another line');
    } else {
      const bus = {
        lineNumber: req.body.lineNumber,
        busColor: req.body.busColor,
        speed: req.body.speed,
        getDistans: req.body.getDistans,
        stationsList: req.body.stationsList,
      };

      const addBus = await busManagr.postBus(bus);
      res.send(addBus);
    }
  } catch (err) {
    res.send('error');
  }
};

export const getBus = async (req: Request, res: Response) => {
  try {
    const lineBus = req.body.lineNumber;
    const bus = await busManagr.getBus(lineBus);
    res.send(bus);
  } catch (err) {
    res.send('error');
  }
};

export const getBuses = async (_req: Request, res: Response) => {
  try {
    const buses = await busManagr.getBuses();
    res.send(buses);
  } catch (err) {
    res.send('error');
  }
};

export const editBus = async (req: Request, res: Response) => {
  try {
    const filter: number = parseInt(req.params.lineNumber as string, 10);
    const chcecker = req.body.lineNumber;
    if (await busManagr.validEdit(chcecker, filter)) {
      res.send('This line already exists Select another line ');
    } else {
      const updateBus: number = parseInt(req.params.lineNumber as string, 10);
      const bus = {
        lineNumber: req.body.lineNumber,
        busColor: req.body.busColor,
        speed: req.body.speed,
        getDistans: req.body.getDistans,
        stationsList: req.body.stationsList,
      };

      const printEdit = await busManagr.updateBus(updateBus, bus);

      res.send(printEdit);
    }
  } catch (err) {
    res.send('error');
  }
};

export const delBus = async (req: Request, res: Response) => {
  try {
    const delbus: number = parseInt(req.params.lineNumber as string, 10);
    const deleted = await busManagr.deleteBus(delbus);
    res.status(200).send(deleted);
  } catch (err) {
    res.send('error');
  }
};

export const getTime = async (req: Request, res: Response) => {
  try {
    const numberLine: number = parseInt(req.body.numberLine as string, 10);
    const numberStation1: number = parseInt(
      req.body.numberStation1 as string,
      10
    );
    const numberStation2: number = parseInt(
      req.body.numberStation2 as string,
      10
    );
    const allStations: Number[] = await busManagr.getAllStation(numberLine);

    if (await busManagr.lineExists(numberLine)) {
      res.send('The line number does not exist');
    } else if (await busManagr.station1Exists(numberLine, numberStation1)) {
      res.send(
        `Station number ${numberStation1} does not exist for line ${numberLine}, the stations of line ${numberLine} are: ${allStations}`
      );
    } else if (await busManagr.station1Exists(numberLine, numberStation2)) {
      res.send(
        `Station number ${numberStation2} does not exist for line ${numberLine}, the stations of line ${numberLine} are: ${allStations}`
      );
    } else {
      const distance = await busManagr.getStations(
        numberLine,
        numberStation1,
        numberStation2
      );
      const Speed = await busManagr.Speed(numberLine);
      const gettime = distance / Speed[0];

      res.send(
        `The distance between the stations is: ${gettime} km, and Travel time is: ${gettime} hr.`
      );
    }
  } catch (err) {
    res.send(err);
  }
};
