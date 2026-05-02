"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { FaHeartbeat } from "react-icons/fa";
import { Button, Input } from "@/components/ui";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Welcome back!");
        router.push(next);
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail("demo@medicare.com");
    setPassword("demo123456");
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: "demo@medicare.com",
        password: "demo123456",
        redirect: false,
      });
      if (result?.error) {
        toast.error("Demo account not available. Please register first.");
      } else {
        toast.success("Logged in with demo account!");
        router.push("/dashboard");
      }
    } catch {
      toast.error("Demo login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-mesh flex items-center justify-center px-4 pt-16">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="glass-card rounded-3xl p-8 md:p-10" data-aos="fade-up">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg mb-3">
              <FaHeartbeat className="text-white text-2xl" />
            </div>
            <h1 className="font-display text-2xl font-bold text-slate-800 dark:text-white">
              Welcome Back
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Sign in to your MediCare account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              id="email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
              placeholder="you@example.com"
              icon={<FiMail size={15} />}
              error={errors.email}
              autoComplete="email"
            />

            <Input
              label="Password"
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
              placeholder="••••••••"
              icon={<FiLock size={15} />}
              iconRight={
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              }
              error={errors.password}
              autoComplete="current-password"
            />

            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-sm text-blue-500 hover:text-blue-600 transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              size="lg"
              icon={<FiArrowRight />}
              iconPosition="right"
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            <span className="text-xs text-slate-400">or</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
          </div>

          {/* Demo Button */}
          <Button
            variant="outline"
            className="w-full"
            onClick={handleDemoLogin}
            loading={loading}
          >
            Continue with Demo Account
          </Button>

          {/* Register Link */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-500 font-semibold hover:text-blue-600 transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
