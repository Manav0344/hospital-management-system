// ─── Types ────────────────────────────────────────────────────────────────
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  experience: number;
  rating: number;
  reviewCount: number;
  avatar: string;
  available: boolean;
  availableDays: string[];
  bio: string;
  education: string;
  languages: string[];
  fee: number;
  badges: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
  available24h?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  date: string;
}

// ─── Doctors Data ────────────────────────────────────────────────────────────
export const DOCTORS: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Sarah Mitchell",
    specialty: "Cardiologist",
    department: "Cardiology",
    experience: 15,
    rating: 4.9,
    reviewCount: 342,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    available: true,
    availableDays: ["Mon", "Tue", "Wed", "Fri"],
    bio: "Dr. Mitchell is a board-certified cardiologist with over 15 years of experience in interventional cardiology and heart failure management.",
    education: "Harvard Medical School, Johns Hopkins Residency",
    languages: ["English", "Spanish"],
    fee: 250,
    badges: ["Top Rated", "FACC"],
  },
  {
    id: "d2",
    name: "Dr. James Chen",
    specialty: "Neurologist",
    department: "Neurology",
    experience: 12,
    rating: 4.8,
    reviewCount: 276,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    available: true,
    availableDays: ["Mon", "Wed", "Thu", "Sat"],
    bio: "Dr. Chen specializes in movement disorders, epilepsy, and neurodegenerative diseases with a focus on precision medicine.",
    education: "Stanford University School of Medicine",
    languages: ["English", "Mandarin"],
    fee: 220,
    badges: ["Top Rated"],
  },
  {
    id: "d3",
    name: "Dr. Priya Sharma",
    specialty: "Pediatrician",
    department: "Pediatrics",
    experience: 10,
    rating: 4.9,
    reviewCount: 418,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    available: true,
    availableDays: ["Tue", "Wed", "Thu", "Fri"],
    bio: "Dr. Sharma is a compassionate pediatrician dedicated to providing comprehensive care for children from newborn through adolescence.",
    education: "Yale School of Medicine, Boston Children's Hospital",
    languages: ["English", "Hindi", "Gujarati"],
    fee: 180,
    badges: ["Best Pediatrician 2023"],
  },
  {
    id: "d4",
    name: "Dr. Marcus Thompson",
    specialty: "Orthopedic Surgeon",
    department: "Orthopedics",
    experience: 18,
    rating: 4.7,
    reviewCount: 189,
    avatar: "https://randomuser.me/api/portraits/men/47.jpg",
    available: false,
    availableDays: ["Mon", "Tue", "Thu"],
    bio: "Dr. Thompson is a leading orthopedic surgeon specializing in joint replacement, sports injuries, and minimally invasive procedures.",
    education: "Columbia University Medical Center",
    languages: ["English"],
    fee: 300,
    badges: ["FAAOS"],
  },
  {
    id: "d5",
    name: "Dr. Elena Rodriguez",
    specialty: "Oncologist",
    department: "Oncology",
    experience: 14,
    rating: 4.8,
    reviewCount: 231,
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    available: true,
    availableDays: ["Mon", "Wed", "Fri"],
    bio: "Dr. Rodriguez specializes in precision oncology and immunotherapy, offering personalized treatment plans for various cancer types.",
    education: "UCSF School of Medicine, MD Anderson Cancer Center",
    languages: ["English", "Spanish", "Portuguese"],
    fee: 280,
    badges: ["Cancer Research Pioneer"],
  },
  {
    id: "d6",
    name: "Dr. Aiden Park",
    specialty: "Dermatologist",
    department: "Dermatology",
    experience: 8,
    rating: 4.6,
    reviewCount: 162,
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    available: true,
    availableDays: ["Tue", "Thu", "Sat"],
    bio: "Dr. Park offers comprehensive dermatology care including skin cancer screening, cosmetic treatments, and management of chronic skin conditions.",
    education: "Duke University School of Medicine",
    languages: ["English", "Korean"],
    fee: 150,
    badges: [],
  },
  {
    id: "d7",
    name: "Dr. Fatima Al-Hassan",
    specialty: "Endocrinologist",
    department: "Endocrinology",
    experience: 11,
    rating: 4.8,
    reviewCount: 204,
    avatar: "https://randomuser.me/api/portraits/women/37.jpg",
    available: true,
    availableDays: ["Mon", "Tue", "Thu", "Fri"],
    bio: "Dr. Al-Hassan is an expert in diabetes management, thyroid disorders, and hormonal imbalances, using evidence-based approaches.",
    education: "Mayo Clinic Alix School of Medicine",
    languages: ["English", "Arabic", "French"],
    fee: 200,
    badges: ["Top Rated"],
  },
  {
    id: "d8",
    name: "Dr. Robert Kim",
    specialty: "Gastroenterologist",
    department: "Gastroenterology",
    experience: 9,
    rating: 4.7,
    reviewCount: 143,
    avatar: "https://randomuser.me/api/portraits/men/63.jpg",
    available: false,
    availableDays: ["Wed", "Thu", "Fri"],
    bio: "Dr. Kim specializes in digestive system disorders, with expertise in endoscopic procedures and inflammatory bowel disease.",
    education: "Northwestern University Feinberg School of Medicine",
    languages: ["English", "Korean"],
    fee: 190,
    badges: [],
  },
];

// ─── Services Data ────────────────────────────────────────────────────────────
export const SERVICES: Service[] = [
  {
    id: "s1",
    title: "Cardiology",
    description: "Comprehensive heart care including diagnostics, interventional procedures, and cardiac rehabilitation.",
    icon: "❤️",
    color: "red",
    features: ["ECG & Echocardiography", "Cardiac Catheterization", "Heart Failure Management", "Preventive Cardiology"],
    available24h: true,
  },
  {
    id: "s2",
    title: "Neurology",
    description: "Expert diagnosis and treatment of brain, spine, and nervous system disorders.",
    icon: "🧠",
    color: "purple",
    features: ["EEG & Brain Imaging", "Stroke Management", "Epilepsy Treatment", "Movement Disorders"],
    available24h: true,
  },
  {
    id: "s3",
    title: "Pediatrics",
    description: "Compassionate healthcare for infants, children, and adolescents.",
    icon: "👶",
    color: "yellow",
    features: ["Well-Child Visits", "Vaccinations", "Developmental Screening", "Pediatric Surgery"],
    available24h: false,
  },
  {
    id: "s4",
    title: "Orthopedics",
    description: "Advanced care for bone, joint, muscle, and sports-related injuries.",
    icon: "🦴",
    color: "blue",
    features: ["Joint Replacement", "Sports Medicine", "Spine Surgery", "Physical Therapy"],
    available24h: false,
  },
  {
    id: "s5",
    title: "Oncology",
    description: "Personalized cancer care with cutting-edge treatments and compassionate support.",
    icon: "🔬",
    color: "teal",
    features: ["Chemotherapy", "Immunotherapy", "Radiation Therapy", "Cancer Screening"],
    available24h: false,
  },
  {
    id: "s6",
    title: "Emergency Care",
    description: "24/7 emergency services with rapid response for life-threatening conditions.",
    icon: "🚨",
    color: "red",
    features: ["Trauma Care", "Acute Care", "Critical Care ICU", "Emergency Surgery"],
    available24h: true,
  },
  {
    id: "s7",
    title: "Radiology",
    description: "State-of-the-art imaging services for accurate diagnosis and treatment planning.",
    icon: "🩻",
    color: "blue",
    features: ["MRI & CT Scan", "PET Scan", "Digital X-Ray", "Ultrasound"],
    available24h: false,
  },
  {
    id: "s8",
    title: "Dermatology",
    description: "Expert care for skin, hair, and nail conditions with cosmetic services.",
    icon: "🌟",
    color: "orange",
    features: ["Skin Cancer Screening", "Laser Treatment", "Cosmetic Procedures", "Allergy Testing"],
    available24h: false,
  },
  {
    id: "s9",
    title: "Ophthalmology",
    description: "Complete eye care from routine exams to complex surgical procedures.",
    icon: "👁️",
    color: "cyan",
    features: ["Cataract Surgery", "LASIK", "Retina Treatment", "Glaucoma Management"],
    available24h: false,
  },
];

// ─── Testimonials ────────────────────────────────────────────────────────────
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Jennifer Walsh",
    role: "Patient — Cardiology",
    content: "Dr. Mitchell saved my life. The care I received at MediCare was extraordinary. From the moment I arrived at the ER to my follow-up appointments, the entire team was professional, compassionate, and incredibly skilled.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    date: "March 2024",
  },
  {
    id: "t2",
    name: "Robert Nguyen",
    role: "Patient — Orthopedics",
    content: "After my knee replacement, I was back on my feet in record time thanks to the amazing orthopedic team. The facility is world-class and the staff genuinely cares about your recovery.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/72.jpg",
    date: "February 2024",
  },
  {
    id: "t3",
    name: "Maria Santos",
    role: "Parent — Pediatrics",
    content: "Dr. Sharma is absolutely wonderful with my children. She explains everything clearly, is always patient, and makes my kids feel at ease during visits. I couldn't ask for a better pediatrician.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/30.jpg",
    date: "April 2024",
  },
  {
    id: "t4",
    name: "David Chen",
    role: "Patient — Neurology",
    content: "After years of struggling with migraines, Dr. Chen finally found the right treatment. The appointment system is seamless and I love being able to track everything through the patient portal.",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/men/18.jpg",
    date: "January 2024",
  },
  {
    id: "t5",
    name: "Anita Patel",
    role: "Patient — Oncology",
    content: "MediCare's oncology team gave me hope when I needed it most. The personalized treatment plan, combined with the emotional support they provided, made all the difference in my recovery journey.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/52.jpg",
    date: "March 2024",
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────
export const HOSPITAL_STATS = [
  { value: "25,000+", label: "Patients Served Annually", color: "blue" },
  { value: "150+", label: "Expert Specialists", color: "teal" },
  { value: "99.2%", label: "Patient Satisfaction", color: "green" },
  { value: "38", label: "Years of Excellence", color: "purple" },
];

// ─── FAQs ────────────────────────────────────────────────────────────────
export const FAQS = [
  {
    q: "How do I book an appointment?",
    a: "You can book an appointment through our website by visiting the Appointment page, calling our helpline, or walking in. Online booking is available 24/7.",
  },
  {
    q: "Do you accept insurance?",
    a: "Yes, we accept most major insurance plans including Medicare, Medicaid, and a wide range of private insurers. Please contact our billing department for specific coverage details.",
  },
  {
    q: "What are your visiting hours?",
    a: "General visiting hours are 9 AM – 8 PM daily. ICU and special wards may have restricted hours. Emergency is open 24/7.",
  },
  {
    q: "How can I access my medical records?",
    a: "Medical records are accessible through our patient portal on your Dashboard after logging in. You can also request physical copies through our records department.",
  },
  {
    q: "Is there parking available?",
    a: "Yes, we have free parking for all patients and visitors. Valet parking is also available at our main entrance from 8 AM – 10 PM.",
  },
  {
    q: "Can I get a second opinion?",
    a: "Absolutely. We encourage patients to seek second opinions when needed. Our patient coordinators can help facilitate consultations with other specialists.",
  },
];

// ─── Departments ────────────────────────────────────────────────────────────
export const DEPARTMENTS = [
  "All",
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Oncology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
];

// ─── Time Slots ────────────────────────────────────────────────────────────
export const TIME_SLOTS = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
];
