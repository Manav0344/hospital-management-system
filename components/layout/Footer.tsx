import Link from "next/link";
import {
  FaHeartbeat,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiArrowRight,
} from "react-icons/fi";

const footerLinks = {
  quickLinks: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/doctors", label: "Our Doctors" },
    { href: "/appointment", label: "Book Appointment" },
  ],
  services: [
    { href: "/services#cardiology", label: "Cardiology" },
    { href: "/services#neurology", label: "Neurology" },
    { href: "/services#orthopedics", label: "Orthopedics" },
    { href: "/services#pediatrics", label: "Pediatrics" },
    { href: "/services#oncology", label: "Oncology" },
  ],
  contact: [
    { icon: FiPhone, text: "+1 (555) 123-4567" },
    { icon: FiMail, text: "info@medicare.hospital" },
    { icon: FiMapPin, text: "123 Medical Center Drive, New York, NY 10001" },
    { icon: FiClock, text: "24/7 Emergency Services" },
  ],
  social: [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
    { icon: FaYoutube, href: "#", label: "YouTube" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white">
      {/* Top CTA Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">
              Need Emergency Help?
            </h3>
            <p className="text-blue-100 text-sm mt-1">
              Our emergency team is available 24/7 for critical care
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="tel:+15551234567"
              className="flex items-center gap-2 bg-white text-blue-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors"
            >
              <FiPhone />
              Call Now
            </a>
            <Link
              href="/appointment"
              className="flex items-center gap-2 bg-white/20 backdrop-blur text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/30 transition-colors border border-white/30"
            >
              Book Appointment
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <FaHeartbeat className="text-white text-xl" />
              </div>
              <div>
                <span className="font-display font-bold text-2xl text-white">
                  Medi<span className="text-teal-400">Care</span>
                </span>
                <p className="text-[10px] text-slate-400 -mt-0.5 font-mono tracking-wider uppercase">
                  Hospital
                </p>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Providing world-class healthcare with compassion and cutting-edge
              technology since 1985. Your health is our mission.
            </p>
            <div className="flex gap-3">
              {footerLinks.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-gradient-to-br hover:from-blue-500 hover:to-teal-500 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300"
                >
                  <social.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-5 flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-blue-500 to-teal-500 rounded-full" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-teal-400 text-sm flex items-center gap-2 transition-colors group"
                  >
                    <FiArrowRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-5 flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-blue-500 to-teal-500 rounded-full" />
              Our Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-teal-400 text-sm flex items-center gap-2 transition-colors group"
                  >
                    <FiArrowRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-5 flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-blue-500 to-teal-500 rounded-full" />
              Contact Us
            </h4>
            <ul className="space-y-4">
              {footerLinks.contact.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon size={14} className="text-teal-400" />
                  </div>
                  <span className="text-slate-400 text-sm leading-relaxed">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} MediCare Hospital. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/sitemap"
              className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
