import { Router } from "express";
import {
  addEnergyCost,
  getEnerygyCost,
} from "../controllers/energyCost.controller";

const router: Router = Router();

/**
 * getEnerygyCost
 */
router.get("/", getEnerygyCost);

/**
 * addEnergyCost
 * @params - {energyCost} - {number}
 */
router.patch("/", addEnergyCost);

export default router;
