import { Router } from "express";
import {
  publishToMqtt,
  getDataByMacAddress,
} from "../controllers/mqtt.controller";

const router: Router = Router();

// postLogsToMqtt();
/**
 * Publish data to Mqtt
 */
router.post("/publish/:macAddress", publishToMqtt);

/**
 * Get Data By MacAdress
 * @params - {macAddress} - {string}
 */
router.post("/data", getDataByMacAddress);

export default router;
