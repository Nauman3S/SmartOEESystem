"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sensorSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, ref: "User" },
    // sensor1: { type: "string", default: "MacAddress" },
    // sensor2: { type: "string", default: "OEE" },
    // sensor3: { type: "string", default: "Temperature" },
    // sensor4: { type: "string", default: "Humidity" },
    // sensor5: { type: "string", default: "AmpsMAX/Watts" },
    sensors: [{ type: String }],
}, { timestamps: true });
const Sensor = (0, mongoose_1.model)("Sensor", sensorSchema);
exports.default = Sensor;
