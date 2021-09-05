import mongoose from 'mongoose';

const busesSchema = new mongoose.Schema(
  {
    lineNumber: {
      type: Number,
      require: true,
    },
    busColor: {
      type: String,
      require: true,
    },
    speed: {
      type: Number,
    },
    getDistans: {
      type: String,
    },
    stationsList: [
      {
        type: Number,
        ref: 'stations',
      },
    ],
  },
  { versionKey: false }
);

export default mongoose.model('buses', busesSchema);
