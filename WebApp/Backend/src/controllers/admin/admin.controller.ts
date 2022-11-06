import { Request, Response } from "express";
import { User, Mqtt } from "../../models";
import { userExists, validateEmail } from "../../helpers";

/**
 * Send Dashboard counts
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const dashboardCounts = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users = await User.countDocuments({ role: "client" });

    // const adminId =
    let macAddressCount = await User.find().select("macAddress");
    let totalMacAddress: number = 0;
    //@ts-ignore
    macAddressCount = macAddressCount.map((mac) => {
      //@ts-ignore
      totalMacAddress += mac.macAddress.length;
    });

    const totalUser = await User.countDocuments();

    return res.status(200).json({ users, totalMacAddress, totalUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};

/**
 * Get All Users
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const getAllUsers = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users = await User.find({ role: "client" });
    return res.status(200).json({ users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};

/**
 * Get All Users Macaddress
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const getAllUsersMacaddress = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const macAddressess: any = await User.aggregate([
      { $unwind: "$macAddress" },
    ]);
    return res.status(200).json({ macAddressess });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};

/**
 * Get All Users MqttData
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const getAllUsersMqttData = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const mqttData = await Mqtt.find();
    return res.status(200).json({ mqttData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};

/**
 * Get One Users MqttData
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const getOneUsersMqttData = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const mqttData = await Mqtt.find({ macAddress: req?.body?.macAddress });
    return res.status(200).json({ mqttData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};

/**
 * Creates new instance of User in database
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const signUp = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      password,
    }: { fullName: string; email: string; password: string } = req?.body;

    if (await userExists(email)) {
      return res
        .status(500)
        .json({ message: `User already registered with this email ${email}` });
    }

    if (!(await validateEmail(email))) {
      return res
        .status(500)
        .json({ message: "Please enter correct email address" });
    }
    const user = await User.create({
      fullName,
      email,
      password,
      role: "client",
      clientPassword: password,
      adminId: req?.user?._id,
    });

    user.save();

    return res.status(200).json({ message: "User Signed Up Successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: (error as Error).message,
    });
  }
};
