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
  position_X: {
    type: Number,
    require,
  },
  position_Y: {
    type: Number,
    require,
  },
});

export const StationsModel = mongoose.model('stations', StationsSchema);
