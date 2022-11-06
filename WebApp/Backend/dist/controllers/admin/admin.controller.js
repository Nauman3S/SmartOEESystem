"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = exports.getOneUsersMqttData = exports.getAllUsersMqttData = exports.getAllUsersMacaddress = exports.getAllUsers = exports.dashboardCounts = void 0;
const models_1 = require("../../models");
const helpers_1 = require("../../helpers");
/**
 * Send Dashboard counts
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const dashboardCounts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield models_1.User.countDocuments({ role: "client" });
        // const adminId =
        let macAddressCount = yield models_1.User.find().select("macAddress");
        let totalMacAddress = 0;
        //@ts-ignore
        macAddressCount = macAddressCount.map((mac) => {
            //@ts-ignore
            totalMacAddress += mac.macAddress.length;
        });
        const totalUser = yield models_1.User.countDocuments();
        return res.status(200).json({ users, totalMacAddress, totalUser });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.dashboardCounts = dashboardCounts;
/**
 * Get All Users
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield models_1.User.find({ role: "client" });
        return res.status(200).json({ users });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.getAllUsers = getAllUsers;
/**
 * Get All Users Macaddress
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const getAllUsersMacaddress = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const macAddressess = yield models_1.User.aggregate([
            { $unwind: "$macAddress" },
        ]);
        return res.status(200).json({ macAddressess });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.getAllUsersMacaddress = getAllUsersMacaddress;
/**
 * Get All Users MqttData
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const getAllUsersMqttData = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mqttData = yield models_1.Mqtt.find();
        return res.status(200).json({ mqttData });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.getAllUsersMqttData = getAllUsersMqttData;
/**
 * Get One Users MqttData
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const getOneUsersMqttData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const mqttData = yield models_1.Mqtt.find({ macAddress: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.macAddress });
        return res.status(200).json({ mqttData });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.getOneUsersMqttData = getOneUsersMqttData;
/**
 * Creates new instance of User in database
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { fullName, email, password, } = req === null || req === void 0 ? void 0 : req.body;
        if (yield (0, helpers_1.userExists)(email)) {
            return res
                .status(500)
                .json({ message: `User already registered with this email ${email}` });
        }
        if (!(yield (0, helpers_1.validateEmail)(email))) {
            return res
                .status(500)
                .json({ message: "Please enter correct email address" });
        }
        const user = yield models_1.User.create({
            fullName,
            email,
            password,
            role: "client",
            clientPassword: password,
            adminId: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id,
        });
        user.save();
        return res.status(200).json({ message: "User Signed Up Successfully" });
    }
    catch (error) {
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message,
        });
    }
});
exports.signUp = signUp;
