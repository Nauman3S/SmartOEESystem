import { Router } from "express";
import {
  dashboardCounts,
  getAllUsers,
  getAllUsersMacaddress,
  getAllUsersMqttData,
  getOneUsersMqttData,
  signUp,
  getAdminUsers,
  deleteAdminUsers,
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

/**
 * Get user of logged in admin
 */
router.get("/users", getAdminUsers);

/**
 * Delete User
 */
router.patch("/user/delete", deleteAdminUsers);

export default router;
