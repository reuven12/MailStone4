import { IBus } from '../interface/bus.interface';
import * as busRepo from '../repo/bus.repo';

export const postBus = async (bus: IBus) => {
  const addBus = await busRepo.postBus(bus);
  return addBus;
};

export const getBus = async (lineNumber: number) => {
  const bus = await busRepo.getBus(lineNumber);
  return bus;
};

export const getBuses = async () => {
  const buses = await busRepo.getBuses();
  return buses;
};

export const updateBus = async (lineNumber: number, bus: IBus) => {
  const edit = await busRepo.pathBus(lineNumber, bus);
  return edit;
};

export const deleteBus = async (lineNumber: number) => {
  const busDel = await busRepo.removeBus(lineNumber);
  return busDel;
};

export const getStations = async (
  numberLine: number,
  numberStation1: number,
  numberStation2: number
) => {
  const positionx: number[] = [];
  const positiony: number[] = [];
  const getAllParamsInStationOne = await busRepo.get1(
    numberLine,
    numberStation1
  );

  getAllParamsInStationOne.forEach((doc) => {
    positionx.push(doc.localStationX);
    positiony.push(doc.localStationY);
  });

  const getAllParamsInStationTwo = await busRepo.get2(
    numberLine,
    numberStation2
  );

  getAllParamsInStationTwo.forEach((doc) => {
    positionx.push(doc.localStationX);
    positiony.push(doc.localStationY);
  });
  const distance = Math.sqrt(
    positionx[0] * positionx[1] + positiony[0] * positiony[1]
  );
  const math = distance;
  return math;
};

export const Speed = async (numberLine: number) => {
  const getSpeed = await busRepo.getSpeed(numberLine);
  const speed: number[] = [];
  getSpeed.forEach((doc) => {
    speed.push(doc.speed);
  });
  return speed;
};

export const getAllStation = async (numberLine: number) => {
  const allStations: number[] = [];
  const getstation = await busRepo.getAllStation(numberLine);
  getstation.forEach((doc) => {
    allStations.push(doc.stationsNumber);
  });
  return allStations;
};

export const lineExists = async (numberLine: number) => {
  const validation = await busRepo.getAllLineNumbers();
  let valid: boolean = true;
  const lineNum: Number[] = [];
  validation.forEach((doc) => {
    lineNum.push(doc.lineNumber);
  });
  if (lineNum.includes(numberLine)) {
    valid = false;
  }
  return valid;
};

export const validBus = async (numberLine: number) => {
  const validation = await busRepo.getAllLineNumbers();
  let valid: boolean = true;
  const lineNum: Number[] = [];
  validation.forEach((doc) => {
    lineNum.push(doc.lineNumber);
  });
  if (!lineNum.includes(numberLine)) {
    valid = false;
  }
  return valid;
};

export const validEdit = async (numberLine: number, filter: number) => {
  const validation = await busRepo.getAllLineNumbers();
  let valid: boolean = true;
  const lineNum: Number[] = [];
  validation.forEach((doc) => {
    lineNum.push(doc.lineNumber);
  });
  if (!lineNum.includes(numberLine) || filter === numberLine) {
    valid = false;
  }
  return valid;
};

export const station1Exists = async (
  numberLine: number,
  numberStation: number
) => {
  const allStation = await busRepo.getAllStation(numberLine);
  let valid: boolean = true;
  const stations: number[] = [];
  allStation.forEach((doc) => {
    stations.push(doc.stationsNumber);
  });
  if (stations.includes(numberStation)) {
    valid = false;
  }
  return valid;
};
