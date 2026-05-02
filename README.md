# 🏥 MediCare Hospital Management System

A **production-quality, full-stack Hospital Management System** built with Next.js 14, Tailwind CSS, MongoDB, and NextAuth. Designed to showcase SaaS-level engineering and modern UI/UX.

![MediCare](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)
![MongoDB](https://img.shields.io/badge/MongoDB-8-green?style=flat-square&logo=mongodb)

---

## ✨ Features

- **6 full pages** — Home, About, Services, Doctors, Appointment, Dashboard
- **Authentication** — NextAuth with credentials + session management
- **MongoDB** — Mongoose models for Users & Appointments
- **Dark / Light mode** — persisted with system preference support
- **AOS animations** — smooth scroll-triggered transitions
- **Glassmorphism UI** — modern card and backdrop effects
- **Booking flow** — multi-step appointment wizard with calendar
- **Dashboard** — appointments history, profile edit, notifications
- **Fully responsive** — mobile, tablet, desktop
- **SEO ready** — metadata, sitemap, robots.txt
- **TypeScript** — fully typed throughout

---

## 📁 Project Structure

```
hospital-management/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── about/page.tsx          # About page
│   ├── services/page.tsx       # Services page
│   ├── doctors/page.tsx        # Doctors listing
│   ├── appointment/page.tsx    # Booking wizard
│   ├── dashboard/page.tsx      # User dashboard
│   ├── login/page.tsx          # Login
│   ├── register/page.tsx       # Register
│   ├── not-found.tsx           # 404
│   ├── loading.tsx             # Global loader
│   ├── error.tsx               # Error boundary
│   ├── sitemap.ts              # Auto-generated sitemap
│   ├── robots.ts               # Robots.txt
│   └── api/
│       ├── auth/
│       │   ├── [...nextauth]/  # NextAuth handler + options
│       │   └── register/       # Registration endpoint
│       ├── appointments/       # GET/POST + [id] PATCH/DELETE
│       ├── doctors/            # GET doctors list
│       └── user/profile/       # GET/PATCH user profile
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   └── HomeSections.tsx
│   ├── ui/
│   │   ├── index.tsx           # Button, Card, Badge, Input, etc.
│   │   ├── DoctorCard.tsx
│   │   └── AppointmentCard.tsx
│   ├── AOSInit.tsx
│   ├── Providers.tsx
│   └── ThemeProvider.tsx
├── lib/
│   ├── data.ts                 # Static data (doctors, services, etc.)
│   ├── mongodb.ts              # DB connection
│   ├── auth.ts                 # Auth helpers
│   ├── utils.ts                # Utility functions
│   └── metadata.ts             # SEO config
├── models/
│   ├── User.ts                 # Mongoose User schema
│   └── Appointment.ts          # Mongoose Appointment schema
├── types/
│   └── next-auth.d.ts          # Session type extensions
├── middleware.ts               # Route protection
├── tailwind.config.ts
├── next.config.js
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17+ 
- npm or yarn
- MongoDB Atlas account (free tier works)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/hospital-management.git
cd hospital-management
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
# MongoDB connection string from MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hospital-management

# NextAuth — generate secret with: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=MediCare Hospital
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔑 Authentication

The app uses **NextAuth** with credentials provider.

1. Register at `/register`
2. Login at `/login`
3. Dashboard is protected — requires session

**Demo flow** (without MongoDB):
- The app uses static data from `lib/data.ts` for doctors and services
- You need MongoDB only for auth + appointment booking

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## ☁️ Deploy to Vercel

### Option 1: Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option 2: GitHub + Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (set to your Vercel domain)
   - `NEXT_PUBLIC_APP_URL`
5. Click **Deploy**

> **Important**: After deployment, update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` to your Vercel domain (e.g., `https://hospital-management.vercel.app`)

---

## 🗄️ MongoDB Setup (Atlas Free Tier)

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist IP `0.0.0.0/0` for Vercel deployment
5. Get the connection string and paste into `MONGODB_URI`

---

## 🎨 Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 (App Router) | Framework |
| React 18 | UI library |
| TypeScript 5 | Type safety |
| Tailwind CSS 3 | Styling |
| MongoDB + Mongoose | Database |
| NextAuth v4 | Authentication |
| AOS | Scroll animations |
| react-hot-toast | Notifications |
| react-datepicker | Calendar picker |
| react-icons | Icon library |
| framer-motion | UI animations |
| bcryptjs | Password hashing |
| date-fns | Date utilities |

---

## 📱 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, services, about, doctors, testimonials, CTA |
| About | `/about` | History, mission/vision, team, facilities, awards |
| Services | `/services` | All departments, emergency, pricing, FAQs |
| Doctors | `/doctors` | Searchable/filterable doctor listing with profiles |
| Appointment | `/appointment` | 4-step booking wizard with calendar |
| Dashboard | `/dashboard` | Overview, appointments, profile, notifications |
| Login | `/login` | Credentials auth with form validation |
| Register | `/register` | Full registration with password strength meter |

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License

MIT License — free to use for personal and commercial projects.

---

**Built with ❤️ for modern healthcare** — MediCare Hospital Management System
