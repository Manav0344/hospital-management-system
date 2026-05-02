import mongoose, { Document, Schema } from "mongoose";

export interface IAppointment extends Document {
  appointmentId: string;
  patient: mongoose.Types.ObjectId;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  department: string;
  date: Date;
  timeSlot: string;
  reason: string;
  status: "pending" | "confirmed" | "cancelled" | "completed" | "rescheduled";
  notes?: string;
  fee: number;
  paymentStatus: "pending" | "paid" | "refunded";
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    appointmentId: { type: String, required: true, unique: true },
    patient: { type: Schema.Types.ObjectId, ref: "User", required: true },
    patientName: { type: String, required: true },
    patientEmail: { type: String, required: true },
    patientPhone: { type: String, required: true },
    doctorId: { type: String, required: true },
    doctorName: { type: String, required: true },
    doctorSpecialty: { type: String, required: true },
    department: { type: String, required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ["pending", "confirmed", "cancelled", "completed", "rescheduled"], default: "pending" },
    notes: { type: String },
    fee: { type: Number, required: true, min: 0 },
    paymentStatus: { type: String, enum: ["pending", "paid", "refunded"], default: "pending" },
  },
  { timestamps: true }
);

AppointmentSchema.index({ patient: 1, date: -1 });
AppointmentSchema.index({ doctorId: 1, date: 1 });

export const Appointment = mongoose.models.Appointment || mongoose.model<IAppointment>("Appointment", AppointmentSchema);
export default Appointment;
