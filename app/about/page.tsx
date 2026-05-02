import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiCheck, FiPhone } from "react-icons/fi";
import { FaAward, FaUserMd, FaHospital, FaHeartbeat, FaMicroscope, FaHandHoldingMedical } from "react-icons/fa";
import { SectionHeader, Badge } from "@/components/ui";
import { DOCTORS } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us — MediCare Hospital",
  description: "Learn about MediCare Hospital's history, mission, team, and commitment to excellent healthcare.",
};

const facilities = [
  { icon: "🏥", title: "Advanced ICU", desc: "32-bed state-of-the-art intensive care unit with real-time monitoring." },
  { icon: "🔬", title: "Research Labs", desc: "Cutting-edge diagnostic and research laboratories for precision medicine." },
  { icon: "🩻", title: "Imaging Center", desc: "Full-service radiology with MRI, CT, PET scan, and digital X-ray." },
  { icon: "🚑", title: "Emergency Wing", desc: "Dedicated trauma bay with 24/7 emergency response teams." },
  { icon: "💊", title: "Pharmacy", desc: "In-house pharmacy with comprehensive medication management." },
  { icon: "🧬", title: "Genetics Lab", desc: "Genomic testing and personalized medicine consultations." },
];

const achievements = [
  { year: "2023", title: "Best Hospital — Northeast Region", org: "American Hospital Association" },
  { year: "2022", title: "Patient Experience Excellence Award", org: "Press Ganey" },
  { year: "2021", title: "Top Heart Program Designation", org: "American College of Cardiology" },
  { year: "2020", title: "Digital Health Innovation Award", org: "HIMSS" },
  { year: "2019", title: "Magnet Recognition — Nursing Excellence", org: "ANCC" },
  { year: "2018", title: "Gold Seal of Approval — Accreditation", org: "The Joint Commission" },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding hero-mesh">
        <div className="container-max text-center">
          <p className="section-label mb-3" data-aos="fade-down">Our Story</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-slate-800 dark:text-white mb-6 leading-tight" data-aos="fade-up">
            About <span className="gradient-text">MediCare Hospital</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="100">
            For nearly four decades, we have been the region&apos;s most trusted healthcare provider,
            combining medical excellence with heartfelt compassion.
          </p>
          <div className="divider mx-auto mt-6" />
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <p className="section-label mb-3">Our History</p>
              <h2 className="font-display text-4xl font-bold text-slate-800 dark:text-white mb-6">
                38 Years of Caring for Our Community
              </h2>
              <div className="divider mb-6" />
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                MediCare Hospital was founded in 1985 by Dr. William Hayes with a simple vision:
                to create a medical institution that combined world-class expertise with genuine
                human compassion. What began as a 50-bed community hospital has grown into a
                leading academic medical center with over 400 beds and 150+ specialists.
              </p>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                Today, we serve over 25,000 patients annually across 20+ specialties, operating
                one of the region&apos;s most advanced trauma centers, cancer institutes, and
                cardiac care programs. Our commitment to research and innovation continues to
                push the boundaries of what&apos;s possible in medicine.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="blue">JCI Accredited</Badge>
                <Badge variant="green">Magnet Hospital</Badge>
                <Badge variant="purple">Level I Trauma Center</Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4" data-aos="fade-left">
              {[
                { label: "Founded", value: "1985", icon: FaHospital, color: "from-blue-500 to-blue-600" },
                { label: "Beds", value: "400+", icon: FaHeartbeat, color: "from-red-500 to-rose-600" },
                { label: "Specialists", value: "150+", icon: FaUserMd, color: "from-teal-500 to-teal-600" },
                { label: "Awards", value: "62", icon: FaAward, color: "from-yellow-500 to-amber-600" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card rounded-2xl p-6 text-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                    <stat.icon className="text-white text-xl" />
                  </div>
                  <p className="font-display text-3xl font-bold text-slate-800 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900/50">
        <div className="container-max">
          <SectionHeader label="Our Purpose" title="Mission & Vision" center />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: FaHeartbeat,
                color: "from-red-500 to-rose-500",
                title: "Our Mission",
                desc: "To deliver exceptional, compassionate healthcare that improves the lives of every patient we serve, while advancing medical knowledge through innovation and education.",
              },
              {
                icon: FaMicroscope,
                color: "from-blue-500 to-indigo-500",
                title: "Our Vision",
                desc: "To be the region's most trusted and innovative health system — transforming healthcare delivery for generations to come through excellence, technology, and humanity.",
              },
              {
                icon: FaHandHoldingMedical,
                color: "from-teal-500 to-green-500",
                title: "Our Values",
                desc: "Compassion, Integrity, Excellence, Collaboration, and Innovation guide every decision we make and every interaction we have with patients, families, and colleagues.",
              },
            ].map((item, i) => (
              <div key={item.title} className="glass-card rounded-2xl p-8 text-center" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-5 text-white text-2xl`}>
                  <item.icon />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-800 dark:text-white mb-3">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-max">
          <SectionHeader label="Our Team" title="Leadership & Specialists" subtitle="Meet the dedicated professionals who make MediCare exceptional." center />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {DOCTORS.slice(0, 4).map((doctor, i) => (
              <div key={doctor.id} className="glass-card rounded-2xl p-5 text-center card-hover" data-aos="fade-up" data-aos-delay={i * 80}>
                <Image
                  src={doctor.avatar}
                  alt={doctor.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 dark:border-blue-900/30 mx-auto mb-3"
                />
                <h4 className="font-semibold text-slate-800 dark:text-white text-sm">{doctor.name}</h4>
                <p className="text-xs text-slate-500 mb-2">{doctor.specialty}</p>
                <p className="text-xs text-blue-500">{doctor.experience} yrs experience</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/doctors" className="btn-primary inline-flex items-center gap-2">
              Meet All Doctors <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900/50">
        <div className="container-max">
          <SectionHeader label="Our Infrastructure" title="World-Class Facilities" subtitle="Every corner of MediCare is designed and equipped for the highest quality care." center />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, i) => (
              <div key={facility.title} className="glass-card rounded-2xl p-6 flex gap-4" data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="text-3xl flex-shrink-0">{facility.icon}</div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-white mb-1">{facility.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{facility.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding">
        <div className="container-max">
          <SectionHeader label="Recognition" title="Awards & Achievements" center />
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {achievements.map((a, i) => (
              <div key={a.title} className="glass-card rounded-2xl p-5 flex items-start gap-4" data-aos="fade-up" data-aos-delay={i * 60}>
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaAward className="text-white text-lg" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="yellow" size="sm">{a.year}</Badge>
                  </div>
                  <h4 className="font-semibold text-slate-800 dark:text-white text-sm">{a.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{a.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Preview */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900/50">
        <div className="container-max">
          <div className="glass-card rounded-3xl p-10 md:p-14 text-center max-w-2xl mx-auto" data-aos="fade-up">
            <FaHeartbeat className="text-5xl text-red-500 mx-auto mb-5" />
            <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white mb-3">
              Have Questions?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Our patient care team is here to help. Contact us for inquiries, appointments, or emergencies.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/appointment" className="btn-primary inline-flex items-center gap-2">
                Book a Visit <FiArrowRight />
              </Link>
              <a href="tel:+15551234567" className="btn-secondary inline-flex items-center gap-2">
                <FiPhone /> Call Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
