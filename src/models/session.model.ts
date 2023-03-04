import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface SessionObject {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
}

export interface SessionDocument extends SessionObject, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

const SessionModel = mongoose.model<SessionDocument>("Session", sessionSchema);

export default SessionModel;
