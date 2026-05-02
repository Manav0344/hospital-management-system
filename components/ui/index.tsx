"use client";

import React from "react";
import clsx from "clsx";
import { FiLoader } from "react-icons/fi";

// ─── Button ────────────────────────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export function Button({
  variant = "primary",
  size = "md",
  loading,
  icon,
  iconPosition = "left",
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600 shadow-lg hover:shadow-xl",
    secondary:
      "bg-transparent border-2 border-blue-500 text-blue-500 dark:text-blue-400 hover:bg-blue-500 hover:text-white",
    ghost:
      "bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
    danger:
      "bg-gradient-to-r from-red-500 to-rose-500 text-white hover:from-red-600 hover:to-rose-600 shadow-lg",
    outline:
      "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-500 hover:text-blue-500",
  };

  const sizes = {
    sm: "text-xs px-3 py-2",
    md: "text-sm px-5 py-2.5",
    lg: "text-base px-7 py-3.5",
  };

  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <FiLoader className="animate-spin" size={14} />
      ) : (
        iconPosition === "left" && icon
      )}
      {children}
      {!loading && iconPosition === "right" && icon}
    </button>
  );
}

// ─── Card ────────────────────────────────────────────────────────────────
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({
  children,
  className,
  hover,
  glass,
  padding = "md",
}: CardProps) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={clsx(
        "rounded-2xl border",
        glass
          ? "glass-card"
          : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50",
        hover && "card-hover cursor-pointer",
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────
interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "green" | "red" | "yellow" | "purple" | "slate";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({ children, variant = "blue", size = "sm", dot }: BadgeProps) {
  const variants = {
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    yellow: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    slate: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
  };

  const dotColors = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    purple: "bg-purple-500",
    slate: "bg-slate-500",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        variants[variant],
        size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm"
      )}
    >
      {dot && (
        <span className={clsx("w-1.5 h-1.5 rounded-full", dotColors[variant])} />
      )}
      {children}
    </span>
  );
}

// ─── Skeleton ────────────────────────────────────────────────────────────
interface SkeletonProps {
  className?: string;
  rounded?: string;
}

export function Skeleton({ className, rounded = "rounded-lg" }: SkeletonProps) {
  return <div className={clsx("skeleton", rounded, className)} />;
}

export function DoctorCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex items-start gap-4 mb-4">
        <Skeleton className="w-16 h-16" rounded="rounded-2xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-5 w-20" rounded="rounded-full" />
        </div>
      </div>
      <Skeleton className="h-3 w-full mb-2" />
      <Skeleton className="h-3 w-2/3 mb-4" />
      <div className="flex gap-2">
        <Skeleton className="h-8 flex-1" rounded="rounded-xl" />
        <Skeleton className="h-8 flex-1" rounded="rounded-xl" />
      </div>
    </div>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export function Input({
  label,
  error,
  icon,
  iconRight,
  className,
  id,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={clsx(
            "input-field",
            icon && "pl-10",
            iconRight && "pr-10",
            error && "border-red-400 focus:ring-red-400",
            className
          )}
          {...props}
        />
        {iconRight && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            {iconRight}
          </div>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ─── Select ────────────────────────────────────────────────────────────────
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, id, className, ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        className={clsx("input-field", error && "border-red-400", className)}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ─── Section Header ────────────────────────────────────────────────────────
interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  center,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={clsx(
        "mb-12",
        center && "text-center",
        className
      )}
      data-aos="fade-up"
    >
      {label && <p className="section-label mb-3">{label}</p>}
      <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800 dark:text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl text-base leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
      <div className={clsx("divider mt-4", center && "mx-auto")} />
    </div>
  );
}

// ─── Stats Card ────────────────────────────────────────────────────────────
interface StatCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  color?: string;
}

export function StatCard({ value, label, icon, color = "blue" }: StatCardProps) {
  const colorMap: Record<string, string> = {
    blue: "from-blue-500 to-blue-600",
    teal: "from-teal-500 to-teal-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
  };

  return (
    <div className="glass-card rounded-2xl p-6 flex items-center gap-4">
      <div
        className={clsx(
          "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white text-xl flex-shrink-0",
          colorMap[color] || colorMap.blue
        )}
      >
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold font-display text-slate-800 dark:text-white">
          {value}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </div>
  );
}

// ─── Avatar ────────────────────────────────────────────────────────────────
interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-xl",
  };

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        className={clsx("rounded-full object-cover", sizes[size], className)}
      />
    );
  }

  return (
    <div
      className={clsx(
        "rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold flex-shrink-0",
        sizes[size],
        className
      )}
    >
      {name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()}
    </div>
  );
}

// ─── Empty State ────────────────────────────────────────────────────────────
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon && (
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 text-3xl mb-4">
          {icon}
        </div>
      )}
      <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 max-w-xs">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
