"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FiCalendar, FiClock, FiUser, FiPhone, FiFileText,
  FiCheck, FiAlertCircle, FiArrowRight,
} from "react-icons/fi";
import { Button, Input, Select, SectionHeader } from "@/components/ui";
import { DOCTORS, TIME_SLOTS } from "@/lib/data";
import { formatDate } from "@/lib/utils";

const tips = [
  { icon: "📋", tip: "Bring your insurance card and a valid ID to the appointment." },
  { icon: "⏰", tip: "Please arrive 15 minutes early to complete any required paperwork." },
  { icon: "💊", tip: "List all current medications and supplements you are taking." },
  { icon: "📱", tip: "You will receive a confirmation SMS and email after booking." },
  { icon: "🚗", tip: "Free parking is available. Follow signs to Patient Parking." },
];

export default function AppointmentPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const prefillDoctorId = searchParams.get("doctorId") || "";
  const prefillDoctorName = searchParams.get("doctorName") || "";
  const prefillFee = searchParams.get("fee") || "150";

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState<{ appointmentId: string; date: string; time: string; doctor: string } | null>(null);

  const [form, setForm] = useState({
    patientName: session?.user?.name || "",
    patientPhone: "",
    doctorId: prefillDoctorId,
    reason: "",
    notes: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");

  const selectedDoctor = DOCTORS.find((d) => d.id === form.doctorId);

  const handleField = (key: string, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const handleSubmit = async () => {
    if (!session) {
      toast.error("Please sign in to book an appointment.");
      router.push("/login?next=/appointment");
      return;
    }
    if (!form.doctorId || !selectedDate || !selectedTime || !form.reason || !form.patientPhone) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: form.doctorId,
          doctorName: selectedDoctor?.name,
          doctorSpecialty: selectedDoctor?.specialty,
          department: selectedDoctor?.department,
          date: selectedDate.toISOString(),
          timeSlot: selectedTime,
          reason: form.reason,
          patientPhone: form.patientPhone,
          fee: selectedDoctor?.fee || parseInt(prefillFee),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");

      toast.success("Appointment booked successfully!");
      setConfirmed({
        appointmentId: data.appointment?.appointmentId || "APT-" + Date.now(),
        date: formatDate(selectedDate),
        time: selectedTime,
        doctor: selectedDoctor?.name || "",
      });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ─── Success State ─────────────────────────────────────────────────
  if (confirmed) {
    return (
      <div className="pt-20 min-h-screen hero-mesh flex items-center justify-center px-4">
        <div className="max-w-md w-full glass-card rounded-3xl p-10 text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="text-green-500 text-3xl" />
          </div>
          <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white mb-2">
            Appointment Confirmed!
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
            Your appointment has been successfully scheduled. Check your email for confirmation.
          </p>

          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-5 text-left space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Booking ID</span>
              <span className="font-mono font-bold text-blue-500">{confirmed.appointmentId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Doctor</span>
              <span className="font-medium text-slate-800 dark:text-white">{confirmed.doctor}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Date</span>
              <span className="font-medium text-slate-800 dark:text-white">{confirmed.date}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Time</span>
              <span className="font-medium text-slate-800 dark:text-white">{confirmed.time}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.push("/dashboard")}
              className="btn-primary flex-1"
            >
              View Dashboard
            </button>
            <button
              onClick={() => { setConfirmed(null); setStep(1); setSelectedDate(null); setSelectedTime(""); }}
              className="btn-ghost flex-1"
            >
              Book Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding hero-mesh">
        <div className="container-max text-center">
          <p className="section-label mb-3" data-aos="fade-down">Schedule a Visit</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-slate-800 dark:text-white mb-4" data-aos="fade-up">
            Book an <span className="gradient-text">Appointment</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto" data-aos="fade-up" data-aos-delay="80">
            Schedule a consultation with our specialists in just a few clicks. Quick, easy, and convenient.
          </p>
          <div className="divider mx-auto mt-6" />
        </div>
      </section>

      {/* Step Indicator */}
      <section className="py-8 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="container-max px-4">
          <div className="flex items-center justify-center gap-2">
            {["Patient Details", "Choose Doctor", "Select Date & Time", "Confirm"].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      i + 1 === step
                        ? "bg-gradient-to-br from-blue-500 to-teal-500 text-white shadow-lg"
                        : i + 1 < step
                        ? "bg-green-500 text-white"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-400"
                    }`}
                  >
                    {i + 1 < step ? <FiCheck size={14} /> : i + 1}
                  </div>
                  <span className={`hidden sm:block text-sm font-medium ${i + 1 === step ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}`}>
                    {label}
                  </span>
                </div>
                {i < 3 && <div className={`w-8 h-0.5 ${i + 1 < step ? "bg-green-500" : "bg-slate-200 dark:bg-slate-700"}`} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50 dark:bg-slate-900/50">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-3xl p-8">

                {/* Step 1: Patient Details */}
                {step === 1 && (
                  <div data-aos="fade-up">
                    <h2 className="font-display text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                      <FiUser className="text-blue-500" /> Patient Details
                    </h2>
                    <div className="space-y-4">
                      <Input
                        label="Full Name *"
                        value={form.patientName}
                        onChange={(e) => handleField("patientName", e.target.value)}
                        placeholder="Your full name"
                        icon={<FiUser size={15} />}
                      />
                      <Input
                        label="Phone Number *"
                        value={form.patientPhone}
                        onChange={(e) => handleField("patientPhone", e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        icon={<FiPhone size={15} />}
                        type="tel"
                      />
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                          Reason for Visit *
                        </label>
                        <textarea
                          value={form.reason}
                          onChange={(e) => handleField("reason", e.target.value)}
                          placeholder="Briefly describe your symptoms or reason..."
                          rows={3}
                          className="input-field resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                          Additional Notes (optional)
                        </label>
                        <textarea
                          value={form.notes}
                          onChange={(e) => handleField("notes", e.target.value)}
                          placeholder="Any additional information for the doctor..."
                          rows={2}
                          className="input-field resize-none"
                        />
                      </div>
                    </div>
                    <Button
                      className="mt-6 w-full"
                      size="lg"
                      onClick={() => {
                        if (!form.patientName || !form.patientPhone || !form.reason) {
                          toast.error("Please fill all required fields.");
                          return;
                        }
                        setStep(2);
                      }}
                      icon={<FiArrowRight />}
                      iconPosition="right"
                    >
                      Continue
                    </Button>
                  </div>
                )}

                {/* Step 2: Doctor */}
                {step === 2 && (
                  <div data-aos="fade-up">
                    <h2 className="font-display text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                      <FiUser className="text-blue-500" /> Choose a Doctor
                    </h2>
                    <div className="grid gap-3 mb-6">
                      {DOCTORS.filter((d) => d.available).map((doctor) => (
                        <div
                          key={doctor.id}
                          onClick={() => handleField("doctorId", doctor.id)}
                          className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                            form.doctorId === doctor.id
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                              : "border-slate-200 dark:border-slate-700 hover:border-blue-200"
                          }`}
                        >
                          <img src={doctor.avatar} alt={doctor.name} className="w-12 h-12 rounded-xl object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-slate-800 dark:text-white">{doctor.name}</p>
                            <p className="text-sm text-blue-500">{doctor.specialty}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-slate-800 dark:text-white">${doctor.fee}</p>
                            <p className="text-xs text-slate-500">⭐ {doctor.rating}</p>
                          </div>
                          {form.doctorId === doctor.id && (
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <FiCheck className="text-white" size={12} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button variant="ghost" onClick={() => setStep(1)} className="flex-1">Back</Button>
                      <Button
                        className="flex-1"
                        onClick={() => {
                          if (!form.doctorId) { toast.error("Please select a doctor."); return; }
                          setStep(3);
                        }}
                        icon={<FiArrowRight />}
                        iconPosition="right"
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Date & Time */}
                {step === 3 && (
                  <div data-aos="fade-up">
                    <h2 className="font-display text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                      <FiCalendar className="text-blue-500" /> Select Date & Time
                    </h2>

                    {/* Calendar */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Appointment Date *
                      </label>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        filterDate={isWeekday}
                        minDate={new Date()}
                        placeholderText="Select a date"
                        className="input-field cursor-pointer"
                        dateFormat="MMMM d, yyyy"
                        inline
                      />
                    </div>

                    {/* Time Slots */}
                    {selectedDate && (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                          Available Time Slots *
                        </label>
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                          {TIME_SLOTS.map((slot) => {
                            const unavailable = ["10:00 AM", "2:30 PM"].includes(slot);
                            return (
                              <button
                                key={slot}
                                disabled={unavailable}
                                onClick={() => setSelectedTime(slot)}
                                className={`py-2 px-1 rounded-xl text-xs font-medium transition-all ${
                                  unavailable
                                    ? "bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed line-through"
                                    : selectedTime === slot
                                    ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow"
                                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 mt-6">
                      <Button variant="ghost" onClick={() => setStep(2)} className="flex-1">Back</Button>
                      <Button
                        className="flex-1"
                        onClick={() => {
                          if (!selectedDate || !selectedTime) { toast.error("Please select date and time."); return; }
                          setStep(4);
                        }}
                        icon={<FiArrowRight />}
                        iconPosition="right"
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 4: Confirm */}
                {step === 4 && (
                  <div data-aos="fade-up">
                    <h2 className="font-display text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                      <FiFileText className="text-blue-500" /> Confirm Booking
                    </h2>

                    {!session && (
                      <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 rounded-xl mb-5">
                        <FiAlertCircle className="text-yellow-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-yellow-700 dark:text-yellow-300">
                          You need to{" "}
                          <a href="/login?next=/appointment" className="font-semibold underline">sign in</a>{" "}
                          to complete your booking.
                        </p>
                      </div>
                    )}

                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6 space-y-4 mb-6">
                      {[
                        { label: "Patient", value: form.patientName },
                        { label: "Phone", value: form.patientPhone },
                        { label: "Doctor", value: selectedDoctor?.name || "" },
                        { label: "Specialty", value: selectedDoctor?.specialty || "" },
                        { label: "Date", value: selectedDate ? formatDate(selectedDate) : "" },
                        { label: "Time", value: selectedTime },
                        { label: "Reason", value: form.reason },
                        { label: "Consultation Fee", value: `$${selectedDoctor?.fee || prefillFee}` },
                      ].map((r) => (
                        <div key={r.label} className="flex justify-between text-sm">
                          <span className="text-slate-500">{r.label}</span>
                          <span className="font-medium text-slate-800 dark:text-white text-right max-w-[60%]">{r.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button variant="ghost" onClick={() => setStep(3)} className="flex-1">Back</Button>
                      <Button
                        className="flex-1"
                        loading={loading}
                        onClick={handleSubmit}
                        icon={<FiCheck />}
                      >
                        Confirm Booking
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar: Tips */}
            <div className="space-y-4">
              {/* Summary card */}
              {selectedDoctor && (
                <div className="glass-card rounded-2xl p-5" data-aos="fade-left">
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-3 text-sm">Selected Doctor</h3>
                  <div className="flex items-center gap-3">
                    <img src={selectedDoctor.avatar} alt={selectedDoctor.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-white text-sm">{selectedDoctor.name}</p>
                      <p className="text-xs text-blue-500">{selectedDoctor.specialty}</p>
                      <p className="text-xs text-slate-500 mt-0.5">⭐ {selectedDoctor.rating} · ${selectedDoctor.fee}/visit</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="glass-card rounded-2xl p-5" data-aos="fade-left" data-aos-delay="100">
                <h3 className="font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2 text-sm">
                  <FiAlertCircle className="text-blue-500" /> Appointment Tips
                </h3>
                <ul className="space-y-3">
                  {tips.map((t) => (
                    <li key={t.tip} className="flex items-start gap-3 text-sm">
                      <span className="text-base flex-shrink-0">{t.icon}</span>
                      <span className="text-slate-600 dark:text-slate-300 leading-snug">{t.tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Emergency */}
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-2xl p-5" data-aos="fade-left" data-aos-delay="200">
                <p className="font-semibold text-red-700 dark:text-red-400 text-sm mb-1">Emergency?</p>
                <p className="text-xs text-red-600 dark:text-red-300 mb-3">Don&apos;t wait — call our 24/7 emergency line immediately.</p>
                <a href="tel:+15551234567" className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors w-full justify-center">
                  <FiPhone size={13} /> (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
