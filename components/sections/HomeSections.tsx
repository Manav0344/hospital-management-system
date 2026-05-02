"use client";

import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiStar, FiCheck, FiPhone } from "react-icons/fi";
import { FaHeartbeat, FaAward, FaUserMd, FaHospital } from "react-icons/fa";
import { SectionHeader, Badge } from "@/components/ui";
import { DOCTORS, TESTIMONIALS, HOSPITAL_STATS } from "@/lib/data";

// ─── About Section ────────────────────────────────────────────────────────────
export function AboutSection() {
  const highlights = [
    "State-of-the-art medical equipment and technology",
    "Internationally trained and board-certified specialists",
    "Patient-centered care with personalized treatment plans",
    "Cutting-edge research and clinical trials",
  ];

  return (
    <section className="section-padding">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image grid */}
          <div className="relative" data-aos="fade-right">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden h-48 bg-gradient-to-br from-blue-400 to-teal-500 flex items-center justify-center">
                  <FaHospital className="text-white text-6xl opacity-40" />
                </div>
                <div className="rounded-3xl overflow-hidden h-32 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                  <FaAward className="text-blue-500 text-5xl" />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="rounded-3xl overflow-hidden h-32 bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900/30 dark:to-teal-800/30 flex items-center justify-center">
                  <FaHeartbeat className="text-teal-500 text-5xl" />
                </div>
                <div className="rounded-3xl overflow-hidden h-48 bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center">
                  <FaUserMd className="text-white text-6xl opacity-40" />
                </div>
              </div>
            </div>

            {/* Floating stat */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass-card rounded-2xl px-6 py-4 flex items-center gap-4 shadow-xl w-64">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                <FaAward className="text-white text-xl" />
              </div>
              <div>
                <p className="font-bold text-slate-800 dark:text-white">JCI Accredited</p>
                <p className="text-xs text-slate-500">International Quality Standard</p>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div data-aos="fade-left">
            <p className="section-label mb-3">About MediCare</p>
            <h2 className="font-display text-4xl font-bold text-slate-800 dark:text-white mb-4 leading-tight">
              Healing Lives for <span className="gradient-text">38+ Years</span>
            </h2>
            <div className="divider mb-6" />
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              Founded in 1985, MediCare Hospital has been a cornerstone of community health,
              delivering exceptional medical care through innovation, compassion, and a
              steadfast commitment to excellence.
            </p>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
              Our team of over 150 board-certified specialists, supported by cutting-edge
              technology and a patient-first philosophy, ensures that every individual
              receives the highest standard of care.
            </p>

            <ul className="space-y-3 mb-8">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiCheck className="text-green-600 dark:text-green-400" size={11} />
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-300">{h}</span>
                </li>
              ))}
            </ul>

            <Link href="/about" className="btn-primary inline-flex items-center gap-2">
              Our Full Story <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats Section ────────────────────────────────────────────────────────────
export function StatsSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600">
      <div className="container-max px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {HOSPITAL_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <p className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </p>
              <p className="text-blue-100 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Doctors Preview ────────────────────────────────────────────────────────────
export function DoctorsPreview() {
  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-900/50">
      <div className="container-max">
        <SectionHeader
          label="Our Specialists"
          title="Meet Our Expert Doctors"
          subtitle="Our team of compassionate specialists brings decades of experience and global training to deliver exceptional patient outcomes."
          center
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DOCTORS.slice(0, 4).map((doctor, i) => (
            <div
              key={doctor.id}
              className="group glass-card rounded-2xl overflow-hidden card-hover"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              {/* Avatar area */}
              <div className="relative bg-gradient-to-br from-blue-50 to-teal-50 dark:from-slate-700 dark:to-slate-800 p-6 pb-0 flex flex-col items-center">
                <div className="relative">
                  <Image
                    src={doctor.avatar}
                    alt={doctor.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-slate-700 shadow-md"
                  />
                  <span
                    className={`absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full border-2 border-white dark:border-slate-700 ${
                      doctor.available ? "bg-green-500" : "bg-slate-400"
                    }`}
                  />
                </div>
                <div className="text-center mt-3 pb-4">
                  {doctor.badges[0] && (
                    <Badge variant="blue" size="sm">{doctor.badges[0]}</Badge>
                  )}
                </div>
              </div>

              <div className="p-4 pt-3">
                <h3 className="font-semibold text-slate-800 dark:text-white text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {doctor.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-3">
                  {doctor.specialty}
                </p>

                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <FiStar
                      key={j}
                      size={12}
                      className={j < Math.floor(doctor.rating) ? "text-yellow-400 fill-yellow-400" : "text-slate-300"}
                    />
                  ))}
                  <span className="text-xs text-slate-500 ml-1">({doctor.reviewCount})</span>
                </div>

                <Link
                  href={`/doctors?id=${doctor.id}`}
                  className="btn-primary w-full text-center text-sm py-2 block"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10" data-aos="fade-up">
          <Link href="/doctors" className="btn-secondary inline-flex items-center gap-2">
            View All Doctors <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Section ────────────────────────────────────────────────────────────
export function TestimonialsSection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <SectionHeader
          label="Patient Stories"
          title="What Our Patients Say"
          subtitle="Real stories from real patients who trusted us with their health. Their experiences drive our commitment to excellence."
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <div
              key={t.id}
              className="glass-card rounded-2xl p-6 flex flex-col"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <FiStar
                    key={j}
                    size={14}
                    className={j < t.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-300"}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed flex-1 mb-5 italic">
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm text-slate-800 dark:text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
                <span className="ml-auto text-xs text-slate-400">{t.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ────────────────────────────────────────────────────────────────
export function CTASection() {
  return (
    <section className="section-padding" data-aos="fade-up">
      <div className="container-max">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 p-12 md:p-16 text-center">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <p className="text-blue-200 text-sm font-semibold tracking-widest uppercase mb-3">
              Take the First Step
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Your Health Journey Starts Here
            </h2>
            <p className="text-blue-100 text-lg max-w-xl mx-auto mb-8">
              Schedule an appointment today and experience healthcare that truly puts you first.
              Our specialists are ready to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/appointment"
                className="bg-white text-blue-600 font-semibold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-colors inline-flex items-center gap-2 shadow-lg"
              >
                Book Appointment <FiArrowRight />
              </Link>
              <a
                href="tel:+15551234567"
                className="bg-white/20 backdrop-blur text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/30 border border-white/30 transition-colors inline-flex items-center gap-2"
              >
                <FiPhone /> Call Us Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
