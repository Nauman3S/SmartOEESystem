import { model, Schema, Types } from "mongoose";
import { ISensorsName } from "../types/types";

const sensorSchema = new Schema<ISensorsName>(
  {
    userId: { type: Types.ObjectId, ref: "User" },

    sensors: [{ type: String }],
  },
  { timestamps: true }
);

const Sensor = model<ISensorsName>("Sensor", sensorSchema);
export default Sensor;
