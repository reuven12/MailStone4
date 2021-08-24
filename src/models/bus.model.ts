/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';

const busesSchema = new mongoose.Schema(
  {
    line_number: {
      type: Number,
      require: true,
    },
    bus_color: {
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

export const BusesModel = mongoose.model('buses', busesSchema);
