import type { Metadata } from "next";

export const siteConfig: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://medicare-hospital.vercel.app"
  ),
  title: {
    default: "MediCare Hospital — World-Class Healthcare",
    template: "%s | MediCare Hospital",
  },
  description:
    "MediCare Hospital delivers exceptional, compassionate healthcare with 150+ specialists, cutting-edge technology, and 38 years of trusted excellence.",
  keywords: [
    "hospital",
    "healthcare",
    "doctors",
    "appointments",
    "medical",
    "cardiology",
    "neurology",
    "emergency care",
    "Medicare",
    "MediCare Hospital",
  ],
  authors: [{ name: "MediCare Hospital" }],
  creator: "MediCare Hospital",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://medicare-hospital.vercel.app",
    title: "MediCare Hospital — World-Class Healthcare",
    description:
      "Exceptional, compassionate healthcare with 150+ specialists and 38+ years of excellence.",
    siteName: "MediCare Hospital",
  },
  twitter: {
    card: "summary_large_image",
    title: "MediCare Hospital",
    description: "World-class healthcare delivered with compassion.",
    creator: "@medicare_hospital",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
