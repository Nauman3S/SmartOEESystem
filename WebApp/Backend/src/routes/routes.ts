import { Router } from "express";
import {
  authRoutes,
  macAddressRoutes,
  mqttRoutes,
  adminRoutes,
  countRoutes,
  sensorRoutes,
  energyCostRoutes,
} from ".";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/validator.middleware";

const router: Router = Router();

//All Auth Routes
router.use("/auth", authRoutes);

//All Macaddress Routes
router.use("/macAddress", isAuthenticated, macAddressRoutes);

//All Mqtt Routes
router.use("/mqtt", mqttRoutes);

//All Admin Routes
router.use("/admin", isAuthenticated, isAdmin, adminRoutes);

//All Count Routes
router.use("/count", isAuthenticated, countRoutes);

//All Count Routes
router.use("/sensor", isAuthenticated, sensorRoutes);

//All Energy Cost Routes
router.use("/energy", isAuthenticated, energyCostRoutes);

export default router;
