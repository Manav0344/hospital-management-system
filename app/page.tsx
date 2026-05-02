import { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import {
  AboutSection,
  StatsSection,
  DoctorsPreview,
  TestimonialsSection,
  CTASection,
} from "@/components/sections/HomeSections";

export const metadata: Metadata = {
  title: "MediCare Hospital — World-Class Healthcare",
  description:
    "MediCare Hospital provides comprehensive, compassionate medical care with 150+ specialists, cutting-edge technology, and 38 years of excellence.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <StatsSection />
      <DoctorsPreview />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
