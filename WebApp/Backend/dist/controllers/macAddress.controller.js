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
exports.getButtonByMacAddress = exports.removeMacAddress = exports.updateBtnState = exports.addMacAddress = exports.getAllMacAddress = void 0;
const models_1 = require("../models");
/**
 * Get All Macaddress of LoggedIn User
 * @param {Request} req
 * @param {Request} req
 */
const getAllMacAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const macAddress = yield models_1.User.findOne({
            _id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id,
        }).select("macAddress");
        return res.status(200).json({ data: macAddress });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.getAllMacAddress = getAllMacAddress;
/**
 * Add New Macaddress
 * @param {Request} req
 * @param {Request} req
 */
const addMacAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        yield models_1.User.findOneAndUpdate({ _id: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id }, {
            $push: {
                macAddress: { macAddress: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.macAddress },
            },
        }, { upsert: true });
        return res.status(200).json({ message: "MacAddress Added Successfully!" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.addMacAddress = addMacAddress;
/**
 * Update Button State
 * @param {Request} req
 * @param {Request} req
 */
const updateBtnState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        yield models_1.MacAddress.findOneAndUpdate({
            userId: (_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d._id,
            deviceDetails: { $elemMatch: { macAddress: (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.macAddress } },
        }, {
            $set: { "deviceDetails.$.btnState": (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.btnState },
        });
        return res.status(200).json({ message: "Button Added Successfully!" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.updateBtnState = updateBtnState;
/**
 * Add New Macaddress
 * @param {Request} req
 * @param {Request} req
 */
const removeMacAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j, _k, _l;
    try {
        let { userId } = req === null || req === void 0 ? void 0 : req.body;
        userId =
            ((_g = req === null || req === void 0 ? void 0 : req.user) === null || _g === void 0 ? void 0 : _g.role) === "admin" || ((_h = req === null || req === void 0 ? void 0 : req.user) === null || _h === void 0 ? void 0 : _h.role) === "superAdmin"
                ? userId
                : (_j = req === null || req === void 0 ? void 0 : req.user) === null || _j === void 0 ? void 0 : _j._id;
        yield models_1.User.findOneAndUpdate({ _id: userId }, {
            $pull: {
                macAddress: { macAddress: (_k = req === null || req === void 0 ? void 0 : req.body) === null || _k === void 0 ? void 0 : _k.macAddress },
            },
        });
        yield models_1.Mqtt.deleteMany({ macAddress: (_l = req === null || req === void 0 ? void 0 : req.body) === null || _l === void 0 ? void 0 : _l.macAddress });
        return res.status(200).json({ message: "MacAddress Deleted!" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.removeMacAddress = removeMacAddress;
/**
 * Get Button By MacAddress
 * @param {Request} req
 * @param {Request} req
 */
const getButtonByMacAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _m, _o, _p;
    try {
        const data = yield models_1.Mqtt.find({ macAddress: (_m = req === null || req === void 0 ? void 0 : req.params) === null || _m === void 0 ? void 0 : _m.macAddress });
        const button = yield models_1.MacAddress.find({
            userId: (_o = req === null || req === void 0 ? void 0 : req.user) === null || _o === void 0 ? void 0 : _o._id,
        }, {
            deviceDetails: {
                $elemMatch: { macAddress: (_p = req === null || req === void 0 ? void 0 : req.params) === null || _p === void 0 ? void 0 : _p.macAddress },
            },
        });
        return res.status(200).json({ button, data });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.getButtonByMacAddress = getButtonByMacAddress;
