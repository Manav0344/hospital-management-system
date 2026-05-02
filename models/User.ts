import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: "male" | "female" | "other";
  address?: string;
  bloodGroup?: string;
  role: "patient" | "doctor" | "admin";
  avatar?: string;
  isEmailVerified: boolean;
  notifications: INotification[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

interface INotification {
  id: string;
  message: string;
  type: "appointment" | "reminder" | "system";
  read: boolean;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>({
  id: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ["appointment", "reminder", "system"], default: "system" },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: [true, "Name is required"], trim: true, minlength: 2, maxlength: 100 },
    email: { type: String, required: [true, "Email is required"], unique: true, lowercase: true, trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"] },
    password: { type: String, required: [true, "Password is required"], minlength: 6, select: false },
    phone: { type: String, trim: true },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["male", "female", "other"] },
    address: { type: String, trim: true },
    bloodGroup: { type: String, enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
    role: { type: String, enum: ["patient", "doctor", "admin"], default: "patient" },
    avatar: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    notifications: [NotificationSchema],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
