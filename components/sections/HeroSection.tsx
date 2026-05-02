"use client";

import Link from "next/link";
import { FiArrowRight, FiPlay, FiPhone } from "react-icons/fi";
import { FaHeartbeat, FaAmbulance, FaUserMd, FaShieldAlt } from "react-icons/fa";
import { Button } from "@/components/ui";

const trustBadges = [
  { icon: FaUserMd, label: "150+ Specialists", color: "text-blue-500" },
  { icon: FaShieldAlt, label: "JCI Accredited", color: "text-green-500" },
  { icon: FaAmbulance, label: "24/7 Emergency", color: "text-red-500" },
  { icon: FaHeartbeat, label: "99.2% Success Rate", color: "text-teal-500" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen hero-mesh flex items-center pt-20 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl -z-0 pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-3xl -z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 mb-6"
              data-aos="fade-down"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Now accepting new patients
              </span>
            </div>

            {/* Heading */}
            <h1
              className="font-display text-5xl md:text-6xl xl:text-7xl font-bold text-slate-800 dark:text-white leading-[1.1] mb-6"
              data-aos="fade-up"
              data-aos-delay="50"
            >
              Your Health,{" "}
              <span className="gradient-text">Our Priority.</span>
            </h1>

            <p
              className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-xl"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              World-class medical care delivered with compassion. Book appointments
              with top specialists, access your records, and experience healthcare
              reimagined for the modern world.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap gap-3 mb-10"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <Link href="/appointment">
                <Button size="lg" icon={<FiArrowRight />} iconPosition="right">
                  Book Appointment
                </Button>
              </Link>
              <a href="tel:+15551234567">
                <Button variant="outline" size="lg" icon={<FiPhone />}>
                  Emergency: 555-1234
                </Button>
              </a>
            </div>

            {/* Trust Badges */}
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/60 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 text-center"
                >
                  <badge.icon className={`text-2xl ${badge.color}`} />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 leading-tight">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative" data-aos="fade-left" data-aos-delay="100">
            {/* Main card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-600 to-teal-500 p-1">
              <div className="rounded-[22px] overflow-hidden bg-white dark:bg-slate-900">
                <div className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-slate-800 dark:to-slate-900 p-8 space-y-6">
                  {/* Header row */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                        MediCare Hospital
                      </p>
                      <h3 className="font-display text-xl font-bold text-slate-800 dark:text-white">
                        Patient Dashboard
                      </h3>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                      <FaHeartbeat className="text-white" />
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Appointments", value: "4", color: "bg-blue-500" },
                      { label: "Reports", value: "12", color: "bg-teal-500" },
                      { label: "Prescriptions", value: "7", color: "bg-green-500" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="bg-white dark:bg-slate-800 rounded-2xl p-3 text-center shadow-sm"
                      >
                        <div className={`w-2 h-2 rounded-full ${s.color} mx-auto mb-2`} />
                        <p className="text-2xl font-bold text-slate-800 dark:text-white">
                          {s.value}
                        </p>
                        <p className="text-xs text-slate-500">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Doctor card */}
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      SM
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 dark:text-white text-sm truncate">
                        Dr. Sarah Mitchell
                      </p>
                      <p className="text-xs text-slate-500">Cardiologist</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-green-500 font-medium">Today</p>
                      <p className="text-xs text-slate-500">10:30 AM</p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Recovery Progress</span>
                      <span className="text-blue-500 font-bold">78%</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"
                        style={{ width: "78%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating chips */}
            <div className="absolute -top-4 -left-4 glass-card rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg animate-float">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <span className="text-green-500 text-sm">✓</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-white">
                  Appointment Confirmed
                </p>
                <p className="text-xs text-slate-500">Today, 10:30 AM</p>
              </div>
            </div>

            <div
              className="absolute -bottom-4 -right-4 glass-card rounded-2xl px-4 py-3 shadow-lg"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["bg-blue-400", "bg-teal-400", "bg-green-400"].map((c, i) => (
                    <div
                      key={i}
                      className={`w-7 h-7 rounded-full ${c} border-2 border-white dark:border-slate-800 flex items-center justify-center text-white text-xs font-bold`}
                    >
                      {["J", "M", "S"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800 dark:text-white">
                    +2.5k patients
                  </p>
                  <p className="text-xs text-slate-500">this month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 40 C360 80 1080 0 1440 40 L1440 80 L0 80 Z"
            className="fill-slate-50 dark:fill-slate-900/50"
          />
        </svg>
      </div>
    </section>
  );
}
