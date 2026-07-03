# BloodAid — Project Plan

> Pundra University Blood Aid Organization Management System
> Stack: Next.js 15 · Express.js · MongoDB · Better Auth · Tailwind CSS v4

---

## Tech Stack

### Frontend (blood-aid-client)

- Next.js 15 (App Router, JavaScript)
- React 19
- Tailwind CSS v4
- shadcn/ui (Nova preset)
- Framer Motion
- Better Auth (client)
- Sonner (toasts)
- Lucide React (icons)
- Axios

### Backend (blood-aid-server)

- Node.js + Express.js
- MongoDB (Native Driver)
- Better Auth (server)
- JWT / Session Auth
- CORS + Cookie Parser

---

## Roles

| Role        | Description                                        |
| ----------- | -------------------------------------------------- |
| `user`      | Default role — can request blood, become donor     |
| `volunteer` | Assigned by admin — handles requests, finds donors |
| `admin`     | Full control — manages everything                  |

### Role Change Flow

Anyone registers → role: "user" (default)
User applies → Admin approves → role: "volunteer"
Admin account → manually set in DB

---

## Database

### blood_auth_db (Better Auth manages)

user collection:
├── \_id, name, email, emailVerified
├── role (user | volunteer | admin)
├── bloodGroup, phone, location
├── isDonor, isDonorAvailable
├── totalDonations, lastDonation
├── isVolunteer
└── createdAt, updatedAt
session collection (Better Auth)
account collection (Better Auth)

### blood-aid-db (App manages)

bloodRequests collection:
├── \_id
├── patientName, bloodGroup, quantity
├── condition (Stable | Critical | Very Critical)
├── reason (Surgery | Accident | Disease ...)
├── relation (Self | Parent | Sibling ...)
├── hospitalName, district, neededBy
├── yourName, yourPhone (requester contact)
├── urgency (Normal | Urgent | Emergency)
├── requesterId, requesterName
├── status (pending | active | fulfilled | cancelled)
├── assignedVolunteer { id, name }
├── assignedDonor { name, phone }
└── createdAt, updatedAt

---

## API Endpoints

### Public

GET /api/users/donors → donor search (phone hidden)
GET /api/requests/public → active blood requests

### Protected (user+)

GET /api/users/profile → own profile
PATCH /api/users/profile → update profile
PATCH /api/users/become-donor → register as donor
POST /api/requests → create blood request
GET /api/requests/my → my requests
PATCH /api/requests/:id/cancel → cancel own request

### Volunteer+

GET /api/volunteer/requests → assigned requests
PATCH /api/volunteer/requests/:id/status → update status + add donor info

### Admin only

GET /api/admin/analytics → dashboard stats
GET /api/admin/requests → all requests
PATCH /api/admin/requests/:id/assign → assign volunteer
PATCH /api/admin/requests/:id/status → update status
GET /api/admin/users → all users
PATCH /api/admin/users/:id/role → change role

---

## Blood Request Flow

User submits request
↓
Status: "pending"
↓
Admin sees in dashboard
↓
Admin assigns a volunteer
↓
Status: "active" → Volunteer notified
↓
Volunteer finds matching donor
↓
Volunteer contacts donor
↓
Volunteer updates request with donor info
↓
Status: "fulfilled"

---

## Pages & Routes

### Public Pages

/ → Homepage
/about → About page ✅
/campaigns → Blood campaigns
/events → Events
/blog → Blog list
/blog/[slug] → Blog post
/donors/search → Find donors ✅
/emergency → Emergency request ✅
/stories → Success stories
/gallery → Photo gallery
/faqs → FAQs
/contact → Contact
/volunteer/register → Apply as volunteer
/become-donor → Become a donor

### Auth Pages

/auth/login → Login ✅
/auth/register → Register ✅
/auth/forgot-password → Forgot password

### User Dashboard

/dashboard → Overview + stats
/dashboard/requests → My blood requests
/dashboard/profile → Edit profile
/dashboard/donate → Become donor toggle
/dashboard/history → Donation history
/dashboard/settings → Account settings

### Volunteer Dashboard

/volunteer → Overview
/volunteer/requests → Assigned requests
/volunteer/activity → My activity log

### Admin Dashboard

/admin → Analytics overview
/admin/requests → All blood requests
/admin/users → User management
/admin/volunteers → Volunteer management
/admin/donors → Donor management
/admin/blog → Blog management
/admin/events → Event management
/admin/gallery → Gallery management

---

## Homepage Sections

Hero (slider) ✅
About section ✅
How It Works ✅
Stats / Impact (inside hero)
Active Requests → show recent emergency requests
Campaigns → upcoming campaigns
Success Stories → testimonials
CTA → donate / volunteer

---

## File Structure

### Frontend

src/
├── app/
│ ├── (auth)/
│ │ ├── auth/login/page.jsx ✅
│ │ └── auth/register/page.jsx ✅
│ ├── (main)/
│ │ ├── layout.jsx ✅ Navbar + Footer
│ │ ├── page.jsx ✅ Homepage
│ │ ├── about/page.jsx ✅
│ │ ├── donors/search/page.jsx ✅
│ │ ├── emergency/page.jsx ✅
│ │ ├── campaigns/page.jsx 🔲
│ │ ├── events/page.jsx 🔲
│ │ ├── blog/page.jsx 🔲
│ │ ├── contact/page.jsx 🔲
│ │ ├── faqs/page.jsx 🔲
│ │ ├── stories/page.jsx 🔲
│ │ └── gallery/page.jsx 🔲
│ ├── dashboard/
│ │ ├── layout.jsx 🔲
│ │ ├── page.jsx 🔲 Overview
│ │ ├── requests/page.jsx 🔲
│ │ ├── profile/page.jsx 🔲
│ │ └── settings/page.jsx 🔲
│ ├── volunteer/
│ │ ├── layout.jsx 🔲
│ │ ├── page.jsx 🔲 Overview
│ │ └── requests/page.jsx 🔲
│ ├── admin/
│ │ ├── layout.jsx 🔲
│ │ ├── page.jsx 🔲 Analytics
│ │ ├── requests/page.jsx 🔲
│ │ ├── users/page.jsx 🔲
│ │ └── volunteers/page.jsx 🔲
│ └── layout.jsx ✅ Root
│
├── components/
│ ├── shared/
│ │ ├── Navbar.jsx ✅
│ │ ├── Footer.jsx ✅
│ │ └── Providers.jsx ✅
│ ├── sections/
│ │ ├── HeroSection.jsx ✅
│ │ ├── AboutSection.jsx ✅
│ │ └── HowItWorksSection.jsx ✅
│ ├── about/
│ │ ├── AboutHero.jsx ✅
│ │ ├── AboutStats.jsx ✅
│ │ ├── AboutMission.jsx ✅
│ │ ├── AboutStory.jsx ✅
│ │ ├── AboutValues.jsx ✅
│ │ └── AboutCTA.jsx ✅
│ ├── donors/
│ │ └── DonorsPage.jsx ✅
│ ├── emergency/
│ │ └── EmergencyPage.jsx ✅
│ └── dashboard/ 🔲
│ ├── Sidebar.jsx
│ ├── StatsCard.jsx
│ └── RequestTable.jsx
│
├── lib/
│ ├── auth.js ✅ Better Auth config
│ ├── auth-client.js ✅ Client auth
│ ├── theme.jsx ✅ Dark/light
│ └── api.js 🔲 Axios instance
│
├── middleware.js ✅ Route protection
└── globals.css ✅

### Backend

blood-aid-server/
├── index.js ✅
├── middleware/
│ ├── verifyToken.js ✅
│ └── checkRole.js ✅
├── routes/
│ ├── userRoutes.js ✅
│ ├── requestRoutes.js ✅
│ ├── adminRoutes.js ✅
│ └── volunteerRoutes.js ✅
└── .env ✅

---

## Progress Tracker

### ✅ Done

- [x] Project setup (Next.js 15 + Better Auth + MongoDB)
- [x] Navbar (responsive, dark/light, auth-connected)
- [x] Footer (responsive)
- [x] Login page
- [x] Register page
- [x] Homepage — Hero slider
- [x] Homepage — About section
- [x] Homepage — How It Works section
- [x] About page (full — 6 sections)
- [x] Find Donors page
- [x] Emergency Request page
- [x] Backend — all API routes
- [x] Backend — verifyToken middleware
- [x] Backend — RBAC checkRole middleware
- [x] Middleware.js — protected routes

### 🔲 In Progress / Next

- [ ] lib/api.js — Axios instance with base URL
- [ ] Connect Emergency form → POST /api/requests
- [ ] Connect Donor search → GET /api/users/donors
- [ ] User Dashboard (Overview, Requests, Profile)
- [ ] Admin Dashboard (Analytics, Requests, Users)
- [ ] Volunteer Dashboard (Assigned Requests)

### 🔲 Remaining Public Pages

- [ ] Campaigns (/campaigns)
- [ ] Events (/events)
- [ ] Blog (/blog)
- [ ] Contact (/contact)
- [ ] FAQs (/faqs)
- [ ] Success Stories (/stories)
- [ ] Gallery (/gallery)
- [ ] Volunteer Register (/volunteer/register)
- [ ] Become a Donor (/become-donor)

### 🔲 Polish & Deploy

- [ ] Real data connect (all pages)
- [ ] Error boundaries
- [ ] Loading skeletons
- [ ] SEO metadata
- [ ] Mobile final testing
- [ ] Deploy frontend (Vercel)
- [ ] Deploy backend (Render)

---

## Environment Variables

### Frontend (.env.local)

```env
MONGODB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend (.env)

```env
MONGODB_URI=
PORT=5000
CLIENT_URL=http://localhost:3000
```

---

## Commit Convention

feat(scope): new feature
fix(scope): bug fix
style(scope): UI/CSS changes
refactor(scope): code restructure
chore(scope): setup/config
docs(scope): documentation

---

## Design System

### Colors

- Background dark: `#0a0a0a` / `black`
- Card dark: `#141414` / `zinc-900`
- Accent: `red-600` (#dc2626)
- Gradient: `#7f1d1d → #dc2626 → #ef4444`

### Typography

- Font: Geist Sans + Geist Mono
- Heading: `font-extrabold` / `font-black`
- Body: `text-sm` / `text-base`

### Components Pattern

- Rounded: `rounded-xl` / `rounded-2xl`
- Cards: `border border-zinc-200 dark:border-zinc-800`
- Buttons primary: `bg-red-600 hover:bg-red-500 rounded-full`
- Animations: Framer Motion `whileInView` with `viewport once`
