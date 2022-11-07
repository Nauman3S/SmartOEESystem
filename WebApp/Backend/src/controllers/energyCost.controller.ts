import { Request, Response } from "express";
import { EnergyCost } from "../models";

export const getEnerygyCost = async (req: Request, res: Response) => {
  try {
    const enerygyCost = await EnergyCost.findOne({ userId: req?.user?._id });
    return res.status(200).json(enerygyCost);
  } catch (error) {
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: (error as Error).message,
    });
  }
};

export const addEnergyCost = async (req: Request, res: Response) => {
  try {
    const { energyCost } = req?.body;

    await EnergyCost.findOneAndUpdate(
      {
        userId: req?.user?._id,
      },
      {
        energyCost,
      },
      { upsert: true }
    );

    return res.status(200).json({ message: "Sensor Value Added" });
  } catch (error) {
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: (error as Error).message,
    });
  }
};
