"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mqtt_1 = __importDefault(require("mqtt"));
const colors_1 = require("colors");
const topic = "smartoee/data/#";
const host = "broker.hivemq.com";
const port = "1883";
// const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
const connectUrl = `mqtt://${host}:${port}`;
const connect = () => {
    try {
        let client = mqtt_1.default.connect(connectUrl);
        client.on("connect", () => {
            // if (!err) {
            console.log((0, colors_1.bold)((0, colors_1.yellow)("MQTT Connected")));
            client.subscribe(topic, (err) => {
                if (!err) {
                    console.log(`${(0, colors_1.bold)("MQTT: ")}${(0, colors_1.blue)(`Subscribed to ${(0, colors_1.bold)(topic)} ✅`)}`);
                }
            });
        });
        return client;
    }
    catch (error) {
        console.log(error);
    }
};
exports.connect = connect;
