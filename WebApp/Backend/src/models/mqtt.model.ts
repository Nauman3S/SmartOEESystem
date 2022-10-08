import { model, Schema } from "mongoose";
import { IMqtt } from "../types/types";

const mqttSchema = new Schema<IMqtt>(
  {
    macAddress: { type: String },
    button: { type: String },
    temperatureSensor: { type: String },
    humiditySensor: { type: String },
  },
  {
    timestamps: true,
  }
);

const Mqtt = model<IMqtt>("Mqtt", mqttSchema);
export default Mqtt;
