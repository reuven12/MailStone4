// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose from 'mongoose';

const StationsSchema = new mongoose.Schema({
  stationName: {
    type: String,
    require,
  },
  stationNumber: {
    type: Number,
    require,
  },
  positionX: {
    type: Number,
    require,
  },
  positionY: {
    type: Number,
    require,
  },
});

// eslint-disable-next-line import/prefer-default-export
export const StationsModel = mongoose.model('stations', StationsSchema);
