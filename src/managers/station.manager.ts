import { IStation } from '../interface/station.interface';
import * as stationRepo from '../repo/station.repo';

export const postStation = async (station: IStation) => {
  const addStation = await stationRepo.postStation(station);
  return addStation;
};

export const getStation = async (speed: number) => {
  const station = await stationRepo.getStation(speed);
  return station;
};

export const getStations = async () => {
  const station = await stationRepo.getStations();
  return station;
};

export const updateStation = async (
  stationNumber: number,
  station: IStation
) => {
  const edit = await stationRepo.pathStation(stationNumber, station);
  return edit;
};

export const deleteStation = async (stationNumber: number) => {
  const stationDel = await stationRepo.removeStation(stationNumber);
  return stationDel;
};

export const validStation = async (stationNumber: number) => {
  const validation = await stationRepo.getAllStationsNumbers();
  let valid: boolean = true;
  const num: Number[] = [];
  validation.forEach((doc) => {
    num.push(doc.stationNumber);
  });
  if (!num.includes(stationNumber)) {
    valid = false;
  }
  return valid;
};

export const validEdit = async (stationNumber: number, filter: number) => {
  const validation = await stationRepo.getAllStationsNumbers();
  let valid: boolean = true;
  const lineNum: Number[] = [];
  validation.forEach((doc) => {
    lineNum.push(doc.stationNumber);
  });
  if (!lineNum.includes(stationNumber) || filter === stationNumber) {
    valid = false;
  }
  return valid;
};
