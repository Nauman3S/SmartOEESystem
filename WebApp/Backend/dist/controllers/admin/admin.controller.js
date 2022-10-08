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
exports.deleteAdminUsers = exports.getAdminUsers = exports.signUp = exports.getOneUsersMqttData = exports.getAllUsersMqttData = exports.getAllUsersMacaddress = exports.getAllUsers = exports.dashboardCounts = void 0;
const models_1 = require("../../models");
const helpers_1 = require("../../helpers");
/**
 * Send Dashboard counts
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const dashboardCounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const users = yield models_1.User.countDocuments({ role: "client" });
        const totalAdminUsers = yield models_1.AdminUser.findOne({ userId: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id });
        // const adminId =
        let macAddressCount = ((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.role) === "admin"
            ? yield models_1.User.find({ adminId: (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c._id }).select("macAddress")
            : yield models_1.User.find().select("macAddress");
        let totalMacAddress = 0;
        //@ts-ignore
        macAddressCount = macAddressCount.map((mac) => {
            //@ts-ignore
            totalMacAddress += mac.macAddress.length;
        });
        const totalUser = yield models_1.User.countDocuments();
        return res
            .status(200)
            .json({ users, totalMacAddress, totalUser, totalAdminUsers });
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
        const users = yield models_1.User.find();
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
const getAllUsersMacaddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    try {
        const Macaddressess = ((_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d.role) === "admin"
            ? yield models_1.AdminUser.find({
                userId: (_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e._id,
            }).populate("users")
            : yield models_1.User.find();
        return res.status(200).json({ Macaddressess });
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
    var _f;
    try {
        const mqttData = yield models_1.Mqtt.find({ macAddress: (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.macAddress });
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
    var _g, _h;
    try {
        const { fullName, email, password, role, } = req === null || req === void 0 ? void 0 : req.body;
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
            adminId: (_g = req === null || req === void 0 ? void 0 : req.user) === null || _g === void 0 ? void 0 : _g._id,
        });
        user.save();
        if (role === "client") {
            yield models_1.AdminUser.findOneAndUpdate({ userId: (_h = req === null || req === void 0 ? void 0 : req.user) === null || _h === void 0 ? void 0 : _h._id }, {
                $push: { users: user === null || user === void 0 ? void 0 : user._id },
            }, { upsert: true });
        }
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
/**
 * Get LoggedIn Admin Users
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const getAdminUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _j;
    try {
        const users = yield models_1.AdminUser.findOne({ userId: (_j = req === null || req === void 0 ? void 0 : req.user) === null || _j === void 0 ? void 0 : _j._id }).populate("users");
        return res.status(200).json({ users });
    }
    catch (error) {
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message,
        });
    }
});
exports.getAdminUsers = getAdminUsers;
/**
 * Delete User
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const deleteAdminUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l;
    try {
        yield models_1.AdminUser.findOneAndUpdate({ userId: (_k = req === null || req === void 0 ? void 0 : req.user) === null || _k === void 0 ? void 0 : _k._id }, {
            $pull: { users: req.body.userId },
        });
        yield models_1.User.findByIdAndDelete((_l = req === null || req === void 0 ? void 0 : req.body) === null || _l === void 0 ? void 0 : _l.userId);
        return res.status(200).json({ message: "User Deleted Successfully!" });
    }
    catch (error) {
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message,
        });
    }
});
exports.deleteAdminUsers = deleteAdminUsers;
