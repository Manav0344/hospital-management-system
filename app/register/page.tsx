"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiPhone, FiArrowRight, FiCheck } from "react-icons/fi";
import { FaHeartbeat } from "react-icons/fa";
import { Button, Input } from "@/components/ui";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  gender: string;
  agreeTerms: boolean;
}

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const update = (key: keyof FormData, value: string | boolean) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim() || form.name.length < 2) e.name = "Name must be at least 2 characters";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    if (!form.agreeTerms) e.agreeTerms = "You must agree to the terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.toLowerCase().trim(),
          password: form.password,
          phone: form.phone.trim(),
          gender: form.gender,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      toast.success("Account created! Signing you in...");

      // Auto sign in after register
      const signInResult = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (signInResult?.ok) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = (pw: string) => {
    if (pw.length === 0) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const strength = passwordStrength(form.password);
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];

  return (
    <div className="min-h-screen hero-mesh flex items-center justify-center px-4 pt-16 pb-8">
      <div className="w-full max-w-md">
        <div className="glass-card rounded-3xl p-8 md:p-10" data-aos="fade-up">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg mb-3">
              <FaHeartbeat className="text-white text-2xl" />
            </div>
            <h1 className="font-display text-2xl font-bold text-slate-800 dark:text-white">
              Create Account
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Join MediCare for seamless healthcare
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name *"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Jane Doe"
              icon={<FiUser size={15} />}
              error={errors.name}
            />

            <Input
              label="Email Address *"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com"
              icon={<FiMail size={15} />}
              error={errors.email}
            />

            <Input
              label="Phone Number"
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+1 (555) 000-0000"
              icon={<FiPhone size={15} />}
            />

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Gender
              </label>
              <select
                value={form.gender}
                onChange={(e) => update("gender", e.target.value)}
                className="input-field"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <Input
                label="Password *"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                placeholder="Min. 6 characters"
                icon={<FiLock size={15} />}
                iconRight={
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                }
                error={errors.password}
              />
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          i < strength ? strengthColors[strength - 1] : "bg-slate-200 dark:bg-slate-700"
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs ${["text-red-500", "text-orange-500", "text-yellow-500", "text-green-500"][strength - 1] || "text-slate-400"}`}>
                    {strength > 0 ? strengthLabels[strength - 1] : "Too short"}
                  </p>
                </div>
              )}
            </div>

            <Input
              label="Confirm Password *"
              type={showConfirm ? "text" : "password"}
              value={form.confirmPassword}
              onChange={(e) => update("confirmPassword", e.target.value)}
              placeholder="Repeat password"
              icon={<FiLock size={15} />}
              iconRight={
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <FiEyeOff /> : <FiEye />}
                </button>
              }
              error={errors.confirmPassword}
            />

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={(e) => update("agreeTerms", e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    form.agreeTerms ? "bg-blue-500 border-blue-500" : "border-slate-300 dark:border-slate-600"
                  }`}
                >
                  {form.agreeTerms && <FiCheck className="text-white" size={11} />}
                </div>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-300">
                I agree to the{" "}
                <Link href="/terms" className="text-blue-500 hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>
              </span>
            </label>
            {errors.agreeTerms && <p className="text-xs text-red-500">{errors.agreeTerms}</p>}

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              size="lg"
              icon={<FiArrowRight />}
              iconPosition="right"
            >
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 font-semibold hover:text-blue-600 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
