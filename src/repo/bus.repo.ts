import BusesModel from '../models/bus.model';

export const postBus = async (bus) => {
  const addBus = new BusesModel(bus);
  await addBus.save();
  return addBus;
};

export const getBus = async (lineNumber: number) => {
  const bus = await BusesModel.findOne({ lineNumber });
  return bus;
};

export const getBuses = async () => {
  const bus = await BusesModel.find();
  return bus;
};

export const pathBus = async (lineNumber: number, bus) => {
  const edit = await BusesModel.updateOne(
    { lineNumber },
    {
      lineNumber: bus.lineNumber,
      busColor: bus.busColor,
      speed: bus.speed,
      getDistans: bus.getDistans,
      stationsList: bus.stationsList,
    }
  );
  return edit;
};

export const removeBus = async (lineNumbers: number) => {
  const remove = await BusesModel.deleteOne({ lineNumber: lineNumbers });
  return remove;
};

export const getAllLineNumbers = async () => {
  const lineNum = await BusesModel.aggregate([
    {
      $project: {
        lineNumber: '$lineNumber',
      },
    },
  ]);
  return lineNum;
};

export const get1 = async (numberLine: number, numberStation1: number) => {
  const getDatails1 = await BusesModel.aggregate([
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
        stationsNumber: '$stations.stationNumber',
        localStationX: '$stations.positionX',
        localStationY: '$stations.positionY',
        speed: '$speed',
        lineNumber: '$lineNumber',
      },
    },
    {
      $match: {
        stationsNumber: numberStation1,
      },
    },
  ]);
  return getDatails1;
};

export const get2 = async (numberLine: number, numberStation2: number) => {
  const getDatails2 = await BusesModel.aggregate([
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
        stationsNumber: '$stations.stationNumber',
        localStationX: '$stations.positionX',
        localStationY: '$stations.positionY',
        speed: '$speed',
        lineNumber: '$lineNumber',
      },
    },
    {
      $match: {
        stationsNumber: numberStation2,
      },
    },
  ]);
  return getDatails2;
};

export const getAllStation = async (numberLine: number) => {
  const getDatailsAll = await BusesModel.aggregate([
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
        stationsNumber: '$stations.stationNumber',
      },
    },
  ]);
  return getDatailsAll;
};

export const getSpeed = async (numberLine: number) => {
  const speed = await BusesModel.aggregate([
    {
      $match: {
        lineNumber: numberLine,
      },
    },
    {
      $project: {
        speed: '$speed',
      },
    },
  ]);
  return speed;
};
