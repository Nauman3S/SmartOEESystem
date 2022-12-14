import { model, Schema } from "mongoose";
import { IMqtt } from "../types/types";

const mqttSchema = new Schema<IMqtt>(
  {
    macAddress: { type: String },
    oee: { type: String },
    temperature: { type: String },
    humidity: { type: String },
    watts: { type: String },
  },
  {
    timestamps: true,
  }
);

const Mqtt = model<IMqtt>("Mqtt", mqttSchema);
export default Mqtt;
