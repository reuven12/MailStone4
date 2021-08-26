// eslint-disable-next-line import/no-extraneous-dependencies
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
    model: {
      type: Number,
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

// eslint-disable-next-line import/prefer-default-export
export const BusesModel = mongoose.model('buses', busesSchema);
