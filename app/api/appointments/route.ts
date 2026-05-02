import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { generateAppointmentId } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const userId = (session.user as { id?: string }).id;

    const appointments = await Appointment.find({ patient: userId })
      .sort({ date: -1 })
      .lean();

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("GET appointments error:", error);
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { doctorId, doctorName, doctorSpecialty, department, date, timeSlot, reason, fee, patientPhone } = body;

    if (!doctorId || !date || !timeSlot || !reason || !patientPhone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();
    const userId = (session.user as { id?: string }).id;

    // Check for slot conflicts
    const existing = await Appointment.findOne({
      doctorId,
      date: new Date(date),
      timeSlot,
      status: { $in: ["pending", "confirmed"] },
    });

    if (existing) {
      return NextResponse.json({ error: "This time slot is already booked" }, { status: 409 });
    }

    const appointment = await Appointment.create({
      appointmentId: generateAppointmentId(),
      patient: userId,
      patientName: session.user.name,
      patientEmail: session.user.email,
      patientPhone,
      doctorId,
      doctorName,
      doctorSpecialty,
      department,
      date: new Date(date),
      timeSlot,
      reason,
      fee: fee || 150,
      status: "confirmed",
      paymentStatus: "pending",
    });

    return NextResponse.json({ message: "Appointment booked successfully", appointment }, { status: 201 });
  } catch (error) {
    console.error("POST appointment error:", error);
    return NextResponse.json({ error: "Failed to book appointment" }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
