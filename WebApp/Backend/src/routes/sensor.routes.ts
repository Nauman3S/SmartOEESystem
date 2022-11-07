import { Router } from "express";
import {
  getSensorNames,
  updateSensorNames,
  addSensorValue,
  getSensorValues,
  removeSensorName,
} from "../controllers/sensor.controller";

const router: Router = Router();

/**
 * Get Sensors Names
 */
router.get("/", getSensorNames);

/**
 * Update Sensors Name
 */
router.patch("/", updateSensorNames);

/**
 * Add Sensors Value
 */
router.patch("/add", addSensorValue);

/**
 * Add Sensors Value
 */
router.patch("/remove", removeSensorName);

/**
 * Get Sensors Value
 */
router.get("/get/:macAddress", getSensorValues);

export default router;
