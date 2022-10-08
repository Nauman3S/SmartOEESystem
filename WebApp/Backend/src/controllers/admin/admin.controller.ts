import { Request, Response } from "express";
import { User, AdminUser, Mqtt } from "../../models";
import { userExists, validateEmail } from "../../helpers";

/**
 * Send Dashboard counts
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const dashboardCounts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users = await User.countDocuments({ role: "client" });
    const totalAdminUsers = await AdminUser.findOne({ userId: req?.user?._id });

    // const adminId =
    let macAddressCount =
      req?.user?.role === "admin"
        ? await User.find({ adminId: req?.user?._id }).select("macAddress")
        : await User.find().select("macAddress");
    let totalMacAddress: number = 0;
    //@ts-ignore
    macAddressCount = macAddressCount.map((mac) => {
      //@ts-ignore
      totalMacAddress += mac.macAddress.length;
    });

    const totalUser = await User.countDocuments();

    return res
      .status(200)
      .json({ users, totalMacAddress, totalUser, totalAdminUsers });
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
    const users = await User.find();
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
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const Macaddressess: any =
      req?.user?.role === "admin"
        ? await AdminUser.find({
            userId: req?.user?._id,
          }).populate("users")
        : await User.find();
    return res.status(200).json({ Macaddressess });
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
      role,
    }: { fullName: string; email: string; password: string; role: string } =
      req?.body;

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

    if (role === "client") {
      await AdminUser.findOneAndUpdate(
        { userId: req?.user?._id },
        {
          $push: { users: user?._id },
        },
        { upsert: true }
      );
    }

    return res.status(200).json({ message: "User Signed Up Successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: (error as Error).message,
    });
  }
};
/**
 * Get LoggedIn Admin Users
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const getAdminUsers = async (req: Request, res: Response) => {
  try {
    const users = await AdminUser.findOne({ userId: req?.user?._id }).populate(
      "users"
    );
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: (error as Error).message,
    });
  }
};

/**
 * Delete User
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const deleteAdminUsers = async (req: Request, res: Response) => {
  try {
    await AdminUser.findOneAndUpdate(
      { userId: req?.user?._id },
      {
        $pull: { users: req.body.userId },
      }
    );
    await User.findByIdAndDelete(req?.body?.userId);
    return res.status(200).json({ message: "User Deleted Successfully!" });
  } catch (error) {
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: (error as Error).message,
    });
  }
};
