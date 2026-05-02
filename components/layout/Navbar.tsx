"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "@/components/ThemeProvider";
import {
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiChevronDown,
  FiUser,
  FiLogOut,
  FiCalendar,
  FiGrid,
} from "react-icons/fi";
import { FaHeartbeat } from "react-icons/fa";
import clsx from "clsx";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/doctors", label: "Doctors" },
  { href: "/appointment", label: "Appointment" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <FaHeartbeat className="text-white text-lg" />
            </div>
            <div>
              <span className="font-display font-bold text-xl text-slate-800 dark:text-white">
                Medi<span className="gradient-text">Care</span>
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 -mt-0.5 font-mono tracking-wider uppercase">
                Hospital
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>

            {/* Auth */}
            {session ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {session.user?.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {session.user?.name?.split(" ")[0]}
                  </span>
                  <FiChevronDown
                    size={14}
                    className={clsx(
                      "text-slate-400 transition-transform",
                      userDropdown && "rotate-180"
                    )}
                  />
                </button>

                {userDropdown && (
                  <div className="absolute right-0 top-12 w-52 glass-card rounded-2xl p-2 border border-slate-200 dark:border-slate-700 shadow-xl">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      onClick={() => setUserDropdown(false)}
                    >
                      <FiGrid size={15} />
                      Dashboard
                    </Link>
                    <Link
                      href="/appointment"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      onClick={() => setUserDropdown(false)}
                    >
                      <FiCalendar size={15} />
                      My Appointments
                    </Link>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      onClick={() => setUserDropdown(false)}
                    >
                      <FiUser size={15} />
                      Profile
                    </Link>
                    <hr className="my-1 border-slate-200 dark:border-slate-700" />
                    <button
                      onClick={() => {
                        setUserDropdown(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-full transition-colors"
                    >
                      <FiLogOut size={15} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login" className="btn-ghost text-sm">
                  Sign In
                </Link>
                <Link href="/register" className="btn-primary text-sm py-2">
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "block px-4 py-3 rounded-xl text-sm font-medium transition-all",
                pathname === link.href
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-slate-200 dark:border-slate-800 my-2" />
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="block w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex gap-2 pt-2">
              <Link href="/login" className="flex-1 btn-secondary text-sm text-center py-2.5">
                Sign In
              </Link>
              <Link href="/register" className="flex-1 btn-primary text-sm text-center py-2.5">
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
