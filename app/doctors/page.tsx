"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiStar, FiFilter, FiCalendar, FiDollarSign, FiAward, FiClock } from "react-icons/fi";
import { FaLanguage } from "react-icons/fa";
import { SectionHeader, Badge, Input, Button } from "@/components/ui";
import { DOCTORS, DEPARTMENTS } from "@/lib/data";
import type { Doctor } from "@/lib/data";

function DoctorCard({ doctor, onBook }: { doctor: Doctor; onBook: (d: Doctor) => void }) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden card-hover group" data-aos="fade-up">
      <div className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-slate-700 dark:to-slate-800 p-6 flex items-start gap-4">
        <div className="relative flex-shrink-0">
          <Image
            src={doctor.avatar}
            alt={doctor.name}
            width={72}
            height={72}
            className="w-18 h-18 rounded-2xl object-cover border-2 border-white dark:border-slate-600 shadow"
          />
          <span
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-700 ${
              doctor.available ? "bg-green-500" : "bg-slate-400"
            }`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-800 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
            {doctor.name}
          </h3>
          <p className="text-blue-500 dark:text-blue-400 font-medium text-sm">{doctor.specialty}</p>
          <p className="text-slate-400 text-xs mt-0.5">{doctor.department} Department</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {doctor.badges.map((b) => (
              <Badge key={b} variant="blue" size="sm">{b}</Badge>
            ))}
            {!doctor.available && <Badge variant="slate" size="sm">On Leave</Badge>}
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <FiStar className="text-yellow-400 fill-yellow-400" size={13} />
              <span className="font-bold text-sm text-slate-800 dark:text-white">{doctor.rating}</span>
            </div>
            <p className="text-xs text-slate-500">{doctor.reviewCount} reviews</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-sm text-slate-800 dark:text-white mb-1">{doctor.experience}+</p>
            <p className="text-xs text-slate-500">Years exp.</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-sm text-slate-800 dark:text-white mb-1">${doctor.fee}</p>
            <p className="text-xs text-slate-500">Per visit</p>
          </div>
        </div>

        {/* Education */}
        <div className="flex items-start gap-2 mb-3">
          <FiAward className="text-blue-500 flex-shrink-0 mt-0.5" size={13} />
          <p className="text-xs text-slate-500 dark:text-slate-400">{doctor.education}</p>
        </div>

        {/* Languages */}
        <div className="flex items-center gap-2 mb-3">
          <FaLanguage className="text-teal-500" size={14} />
          <p className="text-xs text-slate-500">{doctor.languages.join(", ")}</p>
        </div>

        {/* Available Days */}
        <div className="flex items-center gap-2 mb-4">
          <FiClock className="text-slate-400" size={13} />
          <div className="flex gap-1">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <span
                key={day}
                className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                  doctor.availableDays.includes(day)
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-400"
                }`}
              >
                {day}
              </span>
            ))}
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-5 line-clamp-2">
          {doctor.bio}
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            disabled={!doctor.available}
            onClick={() => onBook(doctor)}
            icon={<FiCalendar size={13} />}
          >
            {doctor.available ? "Book Now" : "Unavailable"}
          </Button>
          <Link
            href={`/appointment?doctorId=${doctor.id}&doctorName=${encodeURIComponent(doctor.name)}&specialty=${encodeURIComponent(doctor.specialty)}&fee=${doctor.fee}`}
            className="btn-secondary text-sm px-3 py-2 flex-shrink-0"
          >
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"rating" | "experience" | "fee">("rating");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const filtered = useMemo(() => {
    return DOCTORS
      .filter((d) => {
        const matchSearch =
          d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.specialty.toLowerCase().includes(search.toLowerCase()) ||
          d.department.toLowerCase().includes(search.toLowerCase());
        const matchDept = department === "All" || d.department === department;
        const matchAvail = !availableOnly || d.available;
        return matchSearch && matchDept && matchAvail;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "experience") return b.experience - a.experience;
        if (sortBy === "fee") return a.fee - b.fee;
        return 0;
      });
  }, [search, department, availableOnly, sortBy]);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding hero-mesh">
        <div className="container-max text-center">
          <p className="section-label mb-3" data-aos="fade-down">Our Experts</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-slate-800 dark:text-white mb-4" data-aos="fade-up">
            Meet Our <span className="gradient-text">Specialists</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            World-class doctors, renowned researchers, and compassionate caregivers — all under one roof.
          </p>
          <div className="divider mx-auto mt-6" />
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 bg-white dark:bg-slate-900 sticky top-16 md:top-20 z-30 border-b border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="container-max px-4">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="flex-1 min-w-[200px] max-w-xs">
              <Input
                placeholder="Search doctors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={<FiSearch size={15} />}
              />
            </div>

            {/* Dept filter */}
            <div className="flex gap-1 overflow-x-auto pb-1">
              {DEPARTMENTS.slice(0, 6).map((dept) => (
                <button
                  key={dept}
                  onClick={() => setDepartment(dept)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    department === dept
                      ? "tab-active"
                      : "tab-inactive bg-slate-100 dark:bg-slate-800"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Available only */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">Available only</span>
            </label>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="input-field w-auto py-2 text-sm"
            >
              <option value="rating">Sort: Top Rated</option>
              <option value="experience">Sort: Most Experienced</option>
              <option value="fee">Sort: Lowest Fee</option>
            </select>

            <span className="text-sm text-slate-500 ml-2 whitespace-nowrap">
              <FiFilter className="inline mr-1" size={13} />
              {filtered.length} doctors
            </span>
          </div>
        </div>
      </section>

      {/* Doctor Grid */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900/50">
        <div className="container-max">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">No doctors found</h3>
              <p className="text-slate-500">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} onBook={setSelectedDoctor} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedDoctor(null)}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4 mb-6">
              <Image
                src={selectedDoctor.avatar}
                alt={selectedDoctor.name}
                width={80}
                height={80}
                className="w-20 h-20 rounded-2xl object-cover"
              />
              <div>
                <h3 className="font-display text-xl font-bold text-slate-800 dark:text-white">{selectedDoctor.name}</h3>
                <p className="text-blue-500 font-medium">{selectedDoctor.specialty}</p>
                <div className="flex items-center gap-1 mt-1">
                  <FiStar className="text-yellow-400 fill-yellow-400" size={13} />
                  <span className="text-sm text-slate-600 dark:text-slate-300">{selectedDoctor.rating} ({selectedDoctor.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">{selectedDoctor.bio}</p>
            <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-3">
                <p className="text-slate-400 text-xs mb-1">Experience</p>
                <p className="font-semibold text-slate-800 dark:text-white">{selectedDoctor.experience}+ years</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-3">
                <p className="text-slate-400 text-xs mb-1">Consultation Fee</p>
                <p className="font-semibold text-slate-800 dark:text-white">${selectedDoctor.fee}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/appointment?doctorId=${selectedDoctor.id}&doctorName=${encodeURIComponent(selectedDoctor.name)}&specialty=${encodeURIComponent(selectedDoctor.specialty)}&fee=${selectedDoctor.fee}`}
                className="btn-primary flex-1 text-center"
                onClick={() => setSelectedDoctor(null)}
              >
                Book Appointment
              </Link>
              <button onClick={() => setSelectedDoctor(null)} className="btn-ghost px-4">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
