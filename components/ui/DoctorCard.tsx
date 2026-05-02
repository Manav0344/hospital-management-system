"use client";

import Image from "next/image";
import Link from "next/link";
import { FiStar, FiCalendar, FiAward } from "react-icons/fi";
import { FaLanguage } from "react-icons/fa";
import { Badge, Button } from "@/components/ui";
import type { Doctor } from "@/lib/data";

interface DoctorCardProps {
  doctor: Doctor;
  compact?: boolean;
}

export default function DoctorCard({ doctor, compact = false }: DoctorCardProps) {
  if (compact) {
    return (
      <div className="glass-card rounded-2xl p-4 flex items-center gap-3 card-hover">
        <Image
          src={doctor.avatar}
          alt={doctor.name}
          width={48}
          height={48}
          className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-800 dark:text-white text-sm truncate">{doctor.name}</p>
          <p className="text-xs text-blue-500">{doctor.specialty}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <FiStar size={10} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-slate-500">{doctor.rating}</span>
          </div>
        </div>
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${doctor.available ? "bg-green-500" : "bg-slate-300"}`} />
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden card-hover group">
      <div className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-slate-700 dark:to-slate-800 p-6 text-center">
        <div className="relative inline-block mb-3">
          <Image
            src={doctor.avatar}
            alt={doctor.name}
            width={80}
            height={80}
            className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-slate-600 shadow-md"
          />
          <span
            className={`absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full border-2 border-white dark:border-slate-700 ${
              doctor.available ? "bg-green-500" : "bg-slate-400"
            }`}
          />
        </div>
        <h3 className="font-semibold text-slate-800 dark:text-white group-hover:text-blue-600 transition-colors">
          {doctor.name}
        </h3>
        <p className="text-sm text-blue-500 font-medium">{doctor.specialty}</p>
        <div className="flex justify-center gap-1.5 mt-2">
          {doctor.badges.map((b) => (
            <Badge key={b} variant="blue" size="sm">{b}</Badge>
          ))}
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-3 gap-2 text-center mb-4">
          <div>
            <div className="flex items-center justify-center gap-0.5">
              <FiStar size={11} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-bold text-slate-800 dark:text-white">{doctor.rating}</span>
            </div>
            <p className="text-xs text-slate-500">{doctor.reviewCount} reviews</p>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 dark:text-white">{doctor.experience}+</p>
            <p className="text-xs text-slate-500">Years exp.</p>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 dark:text-white">${doctor.fee}</p>
            <p className="text-xs text-slate-500">Per visit</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <FiAward size={12} className="text-blue-400 flex-shrink-0" />
            <span className="truncate">{doctor.education}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <FaLanguage size={13} className="text-teal-400 flex-shrink-0" />
            <span>{doctor.languages.join(", ")}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/appointment?doctorId=${doctor.id}&doctorName=${encodeURIComponent(doctor.name)}&specialty=${encodeURIComponent(doctor.specialty)}&fee=${doctor.fee}`}
            className="flex-1"
          >
            <Button
              size="sm"
              className="w-full"
              disabled={!doctor.available}
              icon={<FiCalendar size={12} />}
            >
              {doctor.available ? "Book Now" : "Unavailable"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
