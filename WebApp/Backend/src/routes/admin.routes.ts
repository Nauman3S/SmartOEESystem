import { Router } from "express";
import {
  dashboardCounts,
  getAllUsers,
  getAllUsersMacaddress,
  getAllUsersMqttData,
  getOneUsersMqttData,
  signUp,
} from "../controllers/admin/admin.controller";

const router: Router = Router();

/**
 * Get Dashbord Counts
 */
router.get("/count", dashboardCounts);

/**
 * Get All Users
 */
router.get("/all-users", getAllUsers);

/**
 * Get All Users Macaddress
 */
router.get("/all-macAddress", getAllUsersMacaddress);

/**
 * Get All Users Mqtt Data
 */
router.get("/all-mqttData", getAllUsersMqttData);

/**
 * Get All Users Mqtt Data
 */
router.get("/mqttData", getOneUsersMqttData);

/**
 * @body
 * fullName-{string}
 * email - {string}
 * password - {string}
 * role = {string}
 */
router.post("/signUp", signUp);

export default router;
