"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiHome } from "react-icons/fi";
import { FaHeartbeat } from "react-icons/fa";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen hero-mesh flex items-center justify-center px-4 pt-16">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
          <FaHeartbeat className="text-white text-3xl" />
        </div>
        <p className="font-mono text-8xl font-bold gradient-text mb-4">404</p>
        <h1 className="font-display text-3xl font-bold text-slate-800 dark:text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary inline-flex items-center gap-2">
            <FiHome /> Go Home
          </Link>
          <button
            onClick={() => router.back()}
            className="btn-secondary inline-flex items-center gap-2"
          >
            <FiArrowLeft /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
