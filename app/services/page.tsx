import { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiAlertCircle, FiPhone, FiChevronDown } from "react-icons/fi";
import { FaAmbulance } from "react-icons/fa";
import { SectionHeader, Badge } from "@/components/ui";
import { SERVICES, FAQS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services — MediCare Hospital",
  description: "Explore our comprehensive range of medical services including cardiology, neurology, orthopedics, oncology, and emergency care.",
};

const pricingPlans = [
  {
    name: "Basic Consultation",
    price: "$80",
    desc: "Standard outpatient consultation",
    features: ["General Physician", "30-min appointment", "Prescription", "Follow-up guidance"],
    highlight: false,
  },
  {
    name: "Specialist Visit",
    price: "$150–$300",
    desc: "Specialist department consultation",
    features: ["Board-certified specialist", "60-min appointment", "Diagnostic review", "Treatment plan", "Medical records access"],
    highlight: true,
  },
  {
    name: "Comprehensive Package",
    price: "$499",
    desc: "Full health assessment package",
    features: ["Multi-specialist review", "Full blood panel", "ECG & imaging", "Nutritional counseling", "6-month follow-up plan"],
    highlight: false,
  },
];

const colorMap: Record<string, string> = {
  red: "bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-800/20",
  purple: "bg-purple-50 dark:bg-purple-900/10 border-purple-100",
  yellow: "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-100",
  blue: "bg-blue-50 dark:bg-blue-900/10 border-blue-100",
  teal: "bg-teal-50 dark:bg-teal-900/10 border-teal-100",
  orange: "bg-orange-50 dark:bg-orange-900/10 border-orange-100",
  cyan: "bg-cyan-50 dark:bg-cyan-900/10 border-cyan-100",
};

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding hero-mesh">
        <div className="container-max text-center">
          <p className="section-label mb-3" data-aos="fade-down">What We Offer</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-slate-800 dark:text-white mb-5" data-aos="fade-up">
            Our <span className="gradient-text">Medical Services</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            From preventive care to complex surgical procedures, our specialists deliver excellence across every department.
          </p>
          <div className="divider mx-auto mt-6" />
        </div>
      </section>

      {/* All Services */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900/50">
        <div className="container-max">
          <SectionHeader label="Departments" title="All Medical Specialties" center />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <div
                key={service.id}
                id={service.id}
                className={`group rounded-2xl p-6 border card-hover ${colorMap[service.color] || colorMap.blue}`}
                data-aos="fade-up"
                data-aos-delay={i * 60}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{service.icon}</span>
                  {service.available24h && (
                    <Badge variant="green" dot>Available 24/7</Badge>
                  )}
                </div>
                <h3 className="font-display text-xl font-bold text-slate-800 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">{service.description}</p>
                <ul className="space-y-2 mb-5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <FiCheck className="text-green-500 flex-shrink-0" size={13} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/appointment" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:gap-3 transition-all">
                  Book Now <FiArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="section-padding" id="emergency">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <p className="section-label mb-3">Always Ready</p>
              <h2 className="font-display text-4xl font-bold text-slate-800 dark:text-white mb-4">
                24/7 Emergency <span className="gradient-text">Medical Services</span>
              </h2>
              <div className="divider mb-6" />
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                Our emergency department operates around the clock with a dedicated trauma team,
                rapid response capabilities, and the technology to handle any critical situation.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {["Trauma Care", "Cardiac Emergency", "Stroke Response", "Pediatric Emergency", "Toxicology", "Critical Care ICU"].map((s) => (
                  <div key={s} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <FiAlertCircle className="text-red-500 flex-shrink-0" size={14} />
                    {s}
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <a href="tel:911" className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-colors">
                  <FaAmbulance /> Call 911
                </a>
                <a href="tel:+15551234567" className="btn-secondary inline-flex items-center gap-2">
                  <FiPhone /> Hospital Line
                </a>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl p-10 text-white text-center" data-aos="fade-left">
              <FaAmbulance className="text-6xl mx-auto mb-4 opacity-80" />
              <p className="font-display text-5xl font-bold mb-2">{"< 15 min"}</p>
              <p className="text-red-100">Average Emergency Response Time</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  { v: "24/7", l: "Open Hours" },
                  { v: "32", l: "ICU Beds" },
                  { v: "8", l: "Trauma Bays" },
                  { v: "100%", l: "Coverage" },
                ].map((s) => (
                  <div key={s.l} className="bg-white/20 rounded-xl p-3">
                    <p className="font-bold text-xl">{s.v}</p>
                    <p className="text-xs text-red-100">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900/50">
        <div className="container-max">
          <SectionHeader label="Transparent Pricing" title="Simple, Honest Pricing" subtitle="We believe in transparent healthcare costs. Most services are covered by major insurance plans." center />
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-7 flex flex-col ${
                  plan.highlight
                    ? "bg-gradient-to-b from-blue-600 to-teal-600 text-white shadow-xl scale-105"
                    : "glass-card"
                }`}
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                {plan.highlight && (
                  <p className={`text-xs font-semibold tracking-widest uppercase mb-3 ${plan.highlight ? "text-blue-200" : "text-blue-500"}`}>
                    Most Popular
                  </p>
                )}
                <h3 className={`font-display text-xl font-bold mb-1 ${plan.highlight ? "text-white" : "text-slate-800 dark:text-white"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.highlight ? "text-blue-100" : "text-slate-500"}`}>{plan.desc}</p>
                <p className={`font-display text-4xl font-bold mb-5 ${plan.highlight ? "text-white" : "gradient-text"}`}>
                  {plan.price}
                </p>
                <ul className="space-y-3 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlight ? "text-blue-100" : "text-slate-600 dark:text-slate-300"}`}>
                      <FiCheck className={plan.highlight ? "text-teal-300" : "text-green-500"} size={13} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/appointment"
                  className={`w-full text-center py-3 rounded-xl font-semibold transition-all ${
                    plan.highlight
                      ? "bg-white text-blue-600 hover:bg-blue-50"
                      : "btn-primary"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 mt-6" data-aos="fade-up">
            * Prices are estimates. Actual costs vary based on insurance, treatment complexity, and other factors.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding">
        <div className="container-max max-w-3xl mx-auto">
          <SectionHeader label="FAQ" title="Frequently Asked Questions" center />
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <details
                key={faq.q}
                className="group glass-card rounded-2xl p-6 cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={i * 60}
              >
                <summary className="flex items-center justify-between font-semibold text-slate-800 dark:text-white list-none">
                  {faq.q}
                  <FiChevronDown className="text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                </summary>
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900/50">
        <div className="container-max">
          <div className="glass-card rounded-3xl p-12 text-center max-w-2xl mx-auto" data-aos="fade-up">
            <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white mb-3">
              Ready to Get Started?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Schedule your appointment with a specialist today.
            </p>
            <Link href="/appointment" className="btn-primary inline-flex items-center gap-2">
              Book Appointment <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
