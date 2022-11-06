import { model, Schema, Types } from "mongoose";
import { ISensorsName } from "../types/types";

const sensorSchema = new Schema<ISensorsName>(
  {
    userId: { type: Types.ObjectId, ref: "User" },
    // sensor1: { type: "string", default: "MacAddress" },
    // sensor2: { type: "string", default: "OEE" },
    // sensor3: { type: "string", default: "Temperature" },
    // sensor4: { type: "string", default: "Humidity" },
    // sensor5: { type: "string", default: "AmpsMAX/Watts" },
    sensors: [{ type: String }],
  },
  { timestamps: true }
);

const Sensor = model<ISensorsName>("Sensor", sensorSchema);
export default Sensor;
