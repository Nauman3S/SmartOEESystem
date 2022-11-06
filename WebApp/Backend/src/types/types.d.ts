import { Types, Document } from "mongoose";
import { ReadStream } from "fs";

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument;
    }
  }
}
interface userI {
  fullName: string;
  email: string;
  password: string;
  role: string;
  otp: { code: number; status: boolean };
}

export interface IUserDocument extends userI, Document, ITimestamps {
  comparePassword(password: string): Promise<boolean>;
  getToken(): string;
}

export interface IMacAddress extends Document, ITimestamps {
  userId: Types.ObjectId;
  macAddress: string[];
}

export interface ISensorsName extends Document, ITimestamps {
  sensors: string[];
}

export interface IEnergyCost extends Document, ITimestamps {
  sensors: string[];
}

export interface IMqtt extends Document, ITimestamps {
  macAddress: string;
  button: string;
  temperatureSensor: string;
  humiditySensor: string;
  longitude: number;
  latitude: number;
}

export interface IOta extends Document, ITimestamps {
  userId: Types.ObjectId;
  fileURL: string;
  key: string;
}

export interface IUploadOptions {
  Bucket: string;
  Body: ReadStream;
  Key: string;
}

export interface IPrograms extends Document, ITimestamps {
  userId: Types.ObjectId;
  programName: string;
  command: string;
}

export interface IButtons extends Document, ITimestamps {
  userId: Types.ObjectId;
  buttons: Object[];
}

export interface ITimestamps {
  createdAt: Date;
  updatedAt: Date;
}
