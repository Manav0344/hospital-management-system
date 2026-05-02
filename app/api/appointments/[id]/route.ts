import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await context.params;
    const body = await req.json();
    const { status } = body;

    await connectDB();
    const userId = (session.user as { id?: string }).id;

    const appointment = await Appointment.findOneAndUpdate(
      { _id: id, patient: userId },
      { status },
      { new: true }
    );

    if (!appointment)
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );

    return NextResponse.json({ message: "Appointment updated", appointment });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await context.params;

    await connectDB();
    const userId = (session.user as { id?: string }).id;

    const appointment = await Appointment.findOneAndUpdate(
      {
        _id: id,
        patient: userId,
        status: { $in: ["pending", "confirmed"] },
      },
      { status: "cancelled" },
      { new: true }
    );

    if (!appointment)
      return NextResponse.json(
        { error: "Appointment not found or cannot be cancelled" },
        { status: 404 }
      );

    return NextResponse.json({
      message: "Appointment cancelled successfully",
    });
  } catch {
    return NextResponse.json(
      { error: "Cancellation failed" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";