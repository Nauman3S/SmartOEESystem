import { Request, Response } from "express";
import { Sensor, SensorValue } from "../models";

export const getSensorNames = async (_req: Request, res: Response) => {
  try {
    const sensors = await Sensor.find();
    return res.status(200).json(sensors);
  } catch (error) {
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: (error as Error).message,
    });
  }
};

export const updateSensorNames = async (req: Request, res: Response) => {
  try {
    await Sensor.findOneAndUpdate(
      { userId: req?.user?._id },
      {
        $push: {
          sensors: req?.body?.sensor,
        },
      },
      { upsert: true }
    );

    return res.status(200).json({ message: "Sensor Name updated" });
  } catch (error) {
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: (error as Error).message,
    });
  }
};

export const removeSensorName = async (req: Request, res: Response) => {
  try {
    let { sensorName }: { sensorName: string } = req?.body;

    await Sensor.findOneAndUpdate(
      { userId: req?.user?._id },
      {
        $pull: {
          sensors: sensorName,
        },
      }
    );
    return res.status(200).json({ message: "MacAddress Deleted!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};

export const addSensorValue = async (req: Request, res: Response) => {
  try {
    const { macAddress, sensorName } = req?.body;

    await SensorValue.findOneAndUpdate(
      {
        userId: req?.user?._id,
        macAddress: macAddress,
        sensorName: sensorName,
      },
      {
        ...req?.body,
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

export const getSensorValues = async (req: Request, res: Response) => {
  try {
    const sensors = await SensorValue.find({
      userId: req?.user?._id,
      macAddress: req?.params?.macAddress,
    }).select("-_id -__v -createdAt -updatedAt -userId -macAddress");
    return res.status(200).json(sensors);
  } catch (error) {
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: (error as Error).message,
    });
  }
};
