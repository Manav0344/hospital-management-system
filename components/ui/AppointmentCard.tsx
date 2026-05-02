"use client";

import { FiCalendar, FiClock, FiX } from "react-icons/fi";
import { Badge } from "@/components/ui";
import { formatDateShort, getStatusColor } from "@/lib/utils";

interface Appointment {
  _id: string;
  appointmentId: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  timeSlot: string;
  status: string;
  reason: string;
  fee: number;
}

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel?: (id: string) => void;
  compact?: boolean;
}

export default function AppointmentCard({
  appointment,
  onCancel,
  compact = false,
}: AppointmentCardProps) {
  const statusColor = getStatusColor(appointment.status) as
    | "green"
    | "yellow"
    | "red"
    | "blue"
    | "purple"
    | "slate";

  const initials = appointment.doctorName
    .split(" ")
    .filter((w) => w.length > 1)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
            {appointment.doctorName}
          </p>
          <p className="text-xs text-slate-500">{formatDateShort(appointment.date)} · {appointment.timeSlot}</p>
        </div>
        <Badge variant={statusColor} size="sm">{appointment.status}</Badge>
      </div>
    );
  }

  return (
    <div className="border border-slate-100 dark:border-slate-700/50 rounded-2xl p-5 hover:border-blue-200 dark:hover:border-blue-800/30 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold flex-shrink-0">
            {initials}
          </div>
          <div>
            <p className="font-semibold text-slate-800 dark:text-white">{appointment.doctorName}</p>
            <p className="text-sm text-blue-500">{appointment.doctorSpecialty}</p>
          </div>
        </div>
        <Badge variant={statusColor}>{appointment.status}</Badge>
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-2">
        <span className="flex items-center gap-1">
          <FiCalendar size={11} /> {formatDateShort(appointment.date)}
        </span>
        <span className="flex items-center gap-1">
          <FiClock size={11} /> {appointment.timeSlot}
        </span>
        <span className="font-mono text-blue-400">{appointment.appointmentId}</span>
      </div>

      <p className="text-xs text-slate-400 italic mb-3">
        &ldquo;{appointment.reason}&rdquo;
      </p>

      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          ${appointment.fee}
        </span>
        {onCancel && (appointment.status === "confirmed" || appointment.status === "pending") && (
          <button
            onClick={() => onCancel(appointment._id)}
            className="flex items-center gap-1 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg transition-colors"
          >
            <FiX size={11} /> Cancel
          </button>
        )}
      </div>
    </div>
  );
}
