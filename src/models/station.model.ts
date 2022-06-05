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

export default mongoose.model('stations', StationsSchema);
