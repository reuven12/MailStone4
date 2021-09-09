/* eslint-disable prettier/prettier */
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

export const validPosition = async (positionX: number, positionY: number) => {
  const position = await stationRepo.checkPosition();
  let valid: boolean = true;
  const positionx: Number[] = [];
  const positiony: Number[] = [];
  position.forEach((doc) => {
    positionx.push(doc.stationsX);
    positiony.push(doc.stationsY);
  });
  for(let i:number=0; i<positionx.length;i+=1){
    const position1:any[]=[];
    const position2:any[]=[];
    position1.push(positionx[i]);
    position2.push(positiony[i])
    if (!position1[i].includes(positionX) && !position2[i].includes(positionY)) {
      valid = false;
  }
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
