import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AOSInit from "@/components/AOSInit";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  title: {
    default: "MediCare Hospital — World-Class Healthcare",
    template: "%s | MediCare Hospital",
  },
  description:
    "MediCare Hospital delivers exceptional, compassionate healthcare with 150+ specialists, cutting-edge technology, and 38 years of trusted excellence.",
  keywords: ["hospital", "healthcare", "doctors", "appointments", "medical care"],
  openGraph: {
    type: "website",
    title: "MediCare Hospital",
    description: "Exceptional healthcare with compassion.",
    siteName: "MediCare Hospital",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          <AOSInit />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                borderRadius: "12px",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "14px",
              },
              success: {
                style: {
                  background: "#f0fdf4",
                  color: "#166534",
                  border: "1px solid #bbf7d0",
                },
              },
              error: {
                style: {
                  background: "#fef2f2",
                  color: "#991b1b",
                  border: "1px solid #fecaca",
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
