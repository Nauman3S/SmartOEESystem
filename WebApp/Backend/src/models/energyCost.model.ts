import { model, Schema, Types } from "mongoose";
import { IEnergyCost } from "../types/types";

const energyCostSchema = new Schema<IEnergyCost>(
  {
    userId: { type: Types.ObjectId, ref: "User" },
    energyCost: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const EnergyCost = model<IEnergyCost>("EnergyCost", energyCostSchema);
export default EnergyCost;
