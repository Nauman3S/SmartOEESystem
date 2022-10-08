import { model, Schema, Types } from "mongoose";
import { IAdminUser } from "../types/types";

const adminUserSchema = new Schema<IAdminUser>(
  {
    userId: { type: Types.ObjectId, ref: "User" },
    users: [{ type: Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const AdminUser = model<IAdminUser>("AdminUser", adminUserSchema);
export default AdminUser;
