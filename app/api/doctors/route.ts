import { NextRequest, NextResponse } from "next/server";
import { DOCTORS } from "@/lib/data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const department = searchParams.get("department");
  const available = searchParams.get("available");
  const search = searchParams.get("search");

  let doctors = [...DOCTORS];

  if (department && department !== "All") {
    doctors = doctors.filter((d) => d.department === department);
  }

  if (available === "true") {
    doctors = doctors.filter((d) => d.available);
  }

  if (search) {
    const q = search.toLowerCase();
    doctors = doctors.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.department.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ doctors, total: doctors.length });
}
