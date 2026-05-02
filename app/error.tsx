"use client";

import { useEffect } from "react";
import { FiRefreshCw } from "react-icons/fi";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl mb-4">⚠️</p>
        <h2 className="font-display text-2xl font-bold text-slate-800 dark:text-white mb-3">
          Something went wrong
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <button
          onClick={reset}
          className="btn-primary inline-flex items-center gap-2"
        >
          <FiRefreshCw /> Try Again
        </button>
      </div>
    </div>
  );
}
