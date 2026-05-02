"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FiCalendar, FiUser, FiBell, FiLogOut, FiEdit, FiCheck,
  FiX, FiClock, FiGrid, FiAlertCircle, FiPhone, FiMail
} from "react-icons/fi";
import { FaHeartbeat } from "react-icons/fa";
import { Badge, Button, Input, Select, Skeleton, Avatar, EmptyState } from "@/components/ui";
import { formatDateShort, getStatusColor } from "@/lib/utils";

interface Appointment {
  _id: string;
  appointmentId: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  timeSlot: string;
  status: string;
  reason: string;
  fee: number;
}

interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  gender?: string;
  dateOfBirth?: string;
  address?: string;
  bloodGroup?: string;
}

const TAB_LIST = [
  { id: "overview", label: "Overview", icon: FiGrid },
  { id: "appointments", label: "Appointments", icon: FiCalendar },
  { id: "profile", label: "Profile", icon: FiUser },
  { id: "notifications", label: "Notifications", icon: FiBell },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editProfile, setEditProfile] = useState<UserProfile | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?next=/dashboard");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const [apptRes, profileRes] = await Promise.all([
        fetch("/api/appointments"),
        fetch("/api/user/profile"),
      ]);
      if (apptRes.ok) {
        const d = await apptRes.json();
        setAppointments(d.appointments || []);
      }
      if (profileRes.ok) {
        const d = await profileRes.json();
        setProfile(d.user);
        setEditProfile(d.user);
      }
    } catch {
      // Use session data as fallback
      if (session?.user) {
        const fallback: UserProfile = { name: session.user.name || "", email: session.user.email || "" };
        setProfile(fallback);
        setEditProfile(fallback);
      }
    } finally {
      setLoadingData(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!editProfile) return;
    setSavingProfile(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editProfile),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setProfile(data.user || editProfile);
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleCancelAppointment = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      const res = await fetch(`/api/appointments/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Cancel failed");
      setAppointments((prev) => prev.map((a) => a._id === id ? { ...a, status: "cancelled" } : a));
      toast.success("Appointment cancelled.");
    } catch {
      toast.error("Failed to cancel appointment.");
    }
  };

  const upcoming = appointments.filter((a) => a.status !== "cancelled" && a.status !== "completed" && new Date(a.date) >= new Date());
  const past = appointments.filter((a) => a.status === "completed" || new Date(a.date) < new Date());

  const notifications = [
    { id: "n1", message: `Appointment confirmed with ${upcoming[0]?.doctorName || "Dr. Mitchell"} for ${upcoming[0]?.timeSlot || "10:30 AM"}`, type: "appointment", time: "2 hours ago", read: false },
    { id: "n2", message: "Your lab results are ready. Please review them in your records.", type: "reminder", time: "Yesterday", read: false },
    { id: "n3", message: "Reminder: Annual wellness check-up is due this month.", type: "system", time: "3 days ago", read: true },
    { id: "n4", message: "MediCare app is now available for iOS and Android.", type: "system", time: "1 week ago", read: true },
  ];

  if (status === "loading" || (status === "unauthenticated")) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="space-y-4 w-full max-w-md px-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Avatar name={session?.user?.name || "User"} size="lg" />
            <div>
              <h1 className="font-display text-2xl font-bold text-slate-800 dark:text-white">
                Welcome back, {session?.user?.name?.split(" ")[0]}!
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{session?.user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-xl transition-colors"
          >
            <FiLogOut /> Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white dark:bg-slate-800 rounded-2xl p-1 mb-6 overflow-x-auto border border-slate-100 dark:border-slate-700">
          {TAB_LIST.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id ? "tab-active" : "tab-inactive"
              }`}
            >
              <tab.icon size={15} />
              {tab.label}
              {tab.id === "notifications" && notifications.filter((n) => !n.read).length > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notifications.filter((n) => !n.read).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ─── Overview Tab ─────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <div>
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Appointments", value: appointments.length, icon: FiCalendar, color: "from-blue-500 to-blue-600" },
                { label: "Upcoming", value: upcoming.length, icon: FiClock, color: "from-teal-500 to-teal-600" },
                { label: "Completed", value: past.length, icon: FiCheck, color: "from-green-500 to-green-600" },
                { label: "Notifications", value: notifications.filter((n) => !n.read).length, icon: FiBell, color: "from-purple-500 to-purple-600" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card rounded-2xl p-5 flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white flex-shrink-0`}>
                    <stat.icon size={16} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-display text-slate-800 dark:text-white">{stat.value}</p>
                    <p className="text-xs text-slate-500">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Upcoming appointments */}
            <div className="glass-card rounded-2xl p-6 mb-6">
              <h3 className="font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <FiCalendar className="text-blue-500" /> Upcoming Appointments
              </h3>
              {loadingData ? (
                <div className="space-y-3">
                  {[1, 2].map((i) => <Skeleton key={i} className="h-16 w-full" />)}
                </div>
              ) : upcoming.length === 0 ? (
                <EmptyState
                  icon={<FiCalendar />}
                  title="No upcoming appointments"
                  description="Book an appointment with one of our specialists."
                  action={<Button onClick={() => router.push("/appointment")} size="sm">Book Now</Button>}
                />
              ) : (
                <div className="space-y-3">
                  {upcoming.slice(0, 3).map((appt) => (
                    <div key={appt._id} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {appt.doctorName.charAt(3)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800 dark:text-white text-sm">{appt.doctorName}</p>
                        <p className="text-xs text-slate-500">{appt.doctorSpecialty}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{formatDateShort(appt.date)}</p>
                        <p className="text-xs text-slate-500">{appt.timeSlot}</p>
                      </div>
                      <Badge variant={getStatusColor(appt.status) as "green" | "yellow" | "red" | "blue" | "purple" | "slate"} size="sm">
                        {appt.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "New Appointment", icon: FiCalendar, href: "/appointment", color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600" },
                  { label: "Find Doctors", icon: FiUser, href: "/doctors", color: "bg-teal-50 dark:bg-teal-900/20 text-teal-600" },
                  { label: "Emergency", icon: FiAlertCircle, href: "tel:+15551234567", color: "bg-red-50 dark:bg-red-900/20 text-red-600" },
                  { label: "Our Services", icon: FaHeartbeat, href: "/services", color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600" },
                ].map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl ${action.color} hover:scale-105 transition-transform text-center`}
                  >
                    <action.icon size={22} />
                    <span className="text-xs font-medium">{action.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── Appointments Tab ──────────────────────────────────────── */}
        {activeTab === "appointments" && (
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-slate-800 dark:text-white mb-6">All Appointments</h3>
            {loadingData ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => <Skeleton key={i} className="h-20 w-full" />)}
              </div>
            ) : appointments.length === 0 ? (
              <EmptyState
                icon={<FiCalendar />}
                title="No appointments yet"
                description="Your appointment history will appear here."
                action={<Button onClick={() => router.push("/appointment")} size="sm">Book First Appointment</Button>}
              />
            ) : (
              <div className="space-y-3">
                {appointments.map((appt) => (
                  <div key={appt._id} className="border border-slate-100 dark:border-slate-700 rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {appt.doctorName.charAt(3)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 dark:text-white">{appt.doctorName}</p>
                          <p className="text-sm text-blue-500">{appt.doctorSpecialty}</p>
                          <p className="text-xs text-slate-500 mt-0.5 font-mono">{appt.appointmentId}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={getStatusColor(appt.status) as "green" | "yellow" | "red" | "blue" | "purple" | "slate"}>
                          {appt.status}
                        </Badge>
                        <p className="text-xs text-slate-500 mt-1">${appt.fee}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm text-slate-500 flex-wrap">
                      <span className="flex items-center gap-1"><FiCalendar size={12} />{formatDateShort(appt.date)}</span>
                      <span className="flex items-center gap-1"><FiClock size={12} />{appt.timeSlot}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 italic">&ldquo;{appt.reason}&rdquo;</p>
                    {(appt.status === "confirmed" || appt.status === "pending") && (
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => handleCancelAppointment(appt._id)}
                          className="text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                        >
                          <FiX size={12} /> Cancel
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── Profile Tab ──────────────────────────────────────────── */}
        {activeTab === "profile" && (
          <div className="glass-card rounded-2xl p-6 max-w-xl">
            <h3 className="font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <FiEdit className="text-blue-500" /> Edit Profile
            </h3>
            {editProfile && (
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  value={editProfile.name}
                  onChange={(e) => setEditProfile((p) => p ? { ...p, name: e.target.value } : p)}
                  icon={<FiUser size={15} />}
                />
                <Input
                  label="Email"
                  value={editProfile.email}
                  disabled
                  icon={<FiMail size={15} />}
                />
                <Input
                  label="Phone Number"
                  value={editProfile.phone || ""}
                  onChange={(e) => setEditProfile((p) => p ? { ...p, phone: e.target.value } : p)}
                  icon={<FiPhone size={15} />}
                  type="tel"
                />
                <Select
                  label="Gender"
                  value={editProfile.gender || ""}
                  onChange={(e) => setEditProfile((p) => p ? { ...p, gender: e.target.value } : p)}
                  options={[
                    { value: "", label: "Select gender" },
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" },
                  ]}
                />
                <Select
                  label="Blood Group"
                  value={editProfile.bloodGroup || ""}
                  onChange={(e) => setEditProfile((p) => p ? { ...p, bloodGroup: e.target.value } : p)}
                  options={[
                    { value: "", label: "Select blood group" },
                    ...["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => ({ value: bg, label: bg })),
                  ]}
                />
                <Input
                  label="Address"
                  value={editProfile.address || ""}
                  onChange={(e) => setEditProfile((p) => p ? { ...p, address: e.target.value } : p)}
                />
                <Button
                  onClick={handleSaveProfile}
                  loading={savingProfile}
                  className="w-full"
                  icon={<FiCheck />}
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ─── Notifications Tab ────────────────────────────────────── */}
        {activeTab === "notifications" && (
          <div className="glass-card rounded-2xl p-6 max-w-xl">
            <h3 className="font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <FiBell className="text-blue-500" /> Notifications
            </h3>
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`flex items-start gap-3 p-4 rounded-2xl transition-colors ${
                    !notif.read
                      ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30"
                      : "bg-slate-50 dark:bg-slate-700/30"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    notif.type === "appointment" ? "bg-blue-500" : notif.type === "reminder" ? "bg-yellow-500" : "bg-slate-400"
                  }`}>
                    {notif.type === "appointment" ? <FiCalendar className="text-white" size={13} /> : <FiBell className="text-white" size={13} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm leading-snug ${!notif.read ? "font-medium text-slate-800 dark:text-white" : "text-slate-600 dark:text-slate-300"}`}>
                      {notif.message}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                  </div>
                  {!notif.read && <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Force dynamic rendering - requires authentication
export const dynamic = "force-dynamic";
