import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { SectionHeader } from "@/components/ui";
import { SERVICES } from "@/lib/data";

const colorMap: Record<string, string> = {
  red: "bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-800/20 text-red-600 dark:text-red-400",
  purple: "bg-purple-50 dark:bg-purple-900/10 border-purple-100 dark:border-purple-800/20 text-purple-600 dark:text-purple-400",
  yellow: "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-100 dark:border-yellow-800/20 text-yellow-600 dark:text-yellow-400",
  blue: "bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800/20 text-blue-600 dark:text-blue-400",
  teal: "bg-teal-50 dark:bg-teal-900/10 border-teal-100 dark:border-teal-800/20 text-teal-600 dark:text-teal-400",
  orange: "bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-800/20 text-orange-600 dark:text-orange-400",
  cyan: "bg-cyan-50 dark:bg-cyan-900/10 border-cyan-100 dark:border-cyan-800/20 text-cyan-600 dark:text-cyan-400",
};

export default function ServicesSection() {
  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-900/50">
      <div className="container-max">
        <SectionHeader
          label="What We Offer"
          title="Comprehensive Medical Services"
          subtitle="From routine check-ups to complex surgical procedures, our expert team is equipped to handle all your healthcare needs."
          center
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.slice(0, 6).map((service, i) => (
            <div
              key={service.id}
              className="group glass-card rounded-2xl p-6 card-hover"
              data-aos="fade-up"
              data-aos-delay={i * 80}
            >
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl border text-2xl mb-5 ${colorMap[service.color] || colorMap.blue}`}
              >
                {service.icon}
              </div>

              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-lg text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                {service.available24h && (
                  <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full font-medium flex-shrink-0 ml-2">
                    24/7
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-1.5 mb-5">
                {service.features.slice(0, 3).map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={`/services#${service.id}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:gap-2.5 transition-all"
              >
                Learn more <FiArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-10" data-aos="fade-up">
          <Link href="/services" className="btn-secondary inline-flex items-center gap-2">
            View All Services <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
