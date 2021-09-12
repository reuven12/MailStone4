import { IStation } from '../interface/station.interface';
import StationModel from '../models/station.model';

export const postStation = async (station: IStation) => {
  const addstation = new StationModel(station);
  await addstation.save();
  return addstation;
};

export const getStation = async (stationNumber: number) => {
  const station = await StationModel.findOne({ stationNumber });
  return station;
};

export const getStations = async () => {
  const station = await StationModel.find();
  return station;
};

export const pathStation = async (stationNumber: number, station: IStation) => {
  const edit = await StationModel.updateOne(
    { stationNumber },
    {
      stationNumber: station.stationNumber,
      stationName: station.stationName,
      positionX: station.positionX,
      positionY: station.positionY,
    }
  );
  return edit;
};

export const removeStation = async (stationNumbers: number) => {
  const remove = await StationModel.deleteOne({
    stationNumber: stationNumbers,
  });
  return remove;
};

export const getAllStationsNumbers = async () => {
  const stationNum: IStation[] = await StationModel.aggregate([
    {
      $project: {
        stationNumber: '$stationNumber',
      },
    },
  ]);
  return stationNum;
};

export const checkPosition = async () => {
  const check = await StationModel.aggregate([
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
        stationsX: '$stations.positionX',
        stationsY: '$stations.positionY',
      },
    },
  ]);
  return check;
};
