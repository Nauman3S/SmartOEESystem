"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _1 = require(".");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validator_middleware_1 = require("../middlewares/validator.middleware");
const router = (0, express_1.Router)();
//All Auth Routes
router.use("/auth", _1.authRoutes);
//All Macaddress Routes
router.use("/macAddress", auth_middleware_1.isAuthenticated, _1.macAddressRoutes);
//All Mqtt Routes
router.use("/mqtt", _1.mqttRoutes);
//All Admin Routes
router.use("/admin", auth_middleware_1.isAuthenticated, validator_middleware_1.isAdmin, _1.adminRoutes);
//All Count Routes
router.use("/count", auth_middleware_1.isAuthenticated, _1.countRoutes);
//All Count Routes
router.use("/sensor", auth_middleware_1.isAuthenticated, _1.sensorRoutes);
//All Energy Cost Routes
router.use("/energy", auth_middleware_1.isAuthenticated, _1.energyCostRoutes);
exports.default = router;
