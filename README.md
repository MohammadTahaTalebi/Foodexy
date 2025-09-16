<!-- HEADER -->
<p align="center">
  <img src="https://raw.githubusercontent.com/ayushsoni1010/ayushsoni1010/main/banner.gif" width="950" alt="Foodexy Banner"/>
</p>

<h1 align="center">Foodexy — Food Ordering Demo</h1>
<p align="center"><strong>Modern, motion-first demo built with Next.js, Supabase, and Prisma.</strong></p>

<!-- ICON STRIP -->
<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="40" height="40" alt="Next.js"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40" height="40" alt="TypeScript"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" width="40" height="40" alt="TailwindCSS"/>
  <img src="https://raw.githubusercontent.com/nolimits4web/swiper-website/master/src/img/logo.svg" width="40" height="40" alt="Swiper"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" width="40" height="40" alt="Prisma"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" width="40" height="40" alt="Supabase"/>
  <img src="https://avatars.githubusercontent.com/u/139895814?s=200&v=4" width="40" height="40" alt="shadcn/ui"/>
</p>

---

## Overview

Foodexy is a **demo** food ordering platform demonstrating:

- Clean **Next.js 15** architecture with App Router & RSC
- **Supabase Auth** and **Prisma** data layer
- Motion-first UX via **Framer Motion**
- **Swiper**-powered carousels
- **TailwindCSS + shadcn/ui** for fast, consistent UI

> Note: This is a demo. Orders are not processed.

<!-- animated but relevant: UI wireframe animation -->
<p align="center">
  <img src="https://raw.githubusercontent.com/abdulr7mann/demo-assets/main/motion-hero-wire.gif" width="880" alt="UI Motion Preview"/>
</p>

---

## Features

- Authentication with **Supabase** (login/register)
- Menu browsing with categories, search, and lazy images
- Demo cart (add/update/remove) with persisted state
- Meal comments with optimistic updates
- Light/Dark theme, accessible keyboard navigation
- Page/section transitions via **Framer Motion**
- Carousels via **Swiper**

---

## Architecture

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="18" height="18" alt="Next.js"/> <strong>Frontend (Next.js 15)</strong><br/>
  App Router, RSC where appropriate, route handlers for APIs, ISR for stable pages.
</p>

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" width="18" height="18" alt="Prisma"/> <strong>Data Layer (Prisma)</strong><br/>
  Prisma models for <code>User</code>, <code>Meal</code>, <code>Category</code>, <code>CartItem</code>, <code>Comment</code> with migrations & seeding.
</p>

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" width="18" height="18" alt="Supabase"/> <strong>Auth & DB (Supabase)</strong><br/>
  Postgres database, email/password auth, optional RLS policies.
</p>

<p>
  <img src="https://raw.githubusercontent.com/nolimits4web/swiper-website/master/src/img/logo.svg" width="18" height="18" alt="Swiper"/> <strong>Carousels</strong><br/>
  Hero/menu sliders with accessibility and touch support.
</p>

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" width="18" height="18" alt="TailwindCSS"/> <strong>Styling</strong><br/>
  TailwindCSS + shadcn/ui components, utility-first with design tokens.
</p>


---

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm
- Supabase project (Postgres)

### 1) Clone & Install

```bash
git clone https://github.com/your-username/foodexy.git
cd foodexy

# choose one
pnpm install
# or
yarn install
# or
npm install
```

### 2) Environment

Create a `.env` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"

DATABASE_URL="YOUR_DATABASE_URL"   # Prisma pooled connection
DIRECT_URL="YOUR_DIRECT_URL"       # Direct (migrations)
```

### 3) Prisma & DB

```bash
npx prisma generate
npx prisma migrate dev --name init
# optional
npx prisma db seed
```

### 4) Dev Server

```bash
pnpm dev
# or
yarn dev
# or
npm run dev
```

Open http://localhost:3000

---

## Project Structure

```
foodexy/
├─ prisma/
│ ├─ schema.prisma
│ └─ seed.ts
├─ public/
│ └─ images/
├─ src/
│ ├─ app/
│ │ ├─ (main)/
│ │ ├─ authentication/
│ │ ├─ email-sent/
│ │ ├─ globals.css
│ │ └─ layout.tsx
│ ├─ components/
│ │ ├─ common/
│ │ └─ ui/
│ │ ├─ CommentForm.tsx
│ │ ├─ PopularSlider.tsx
│ │ ├─ ReviewSlider.tsx
│ │ ├─ ShoppingCartPopover.tsx
│ │ ├─ UserMenuItems.tsx
│ │ ├─ login-form.tsx
│ │ ├─ register-form.tsx
│ │ └─ shopDetailClient.tsx
│ ├─ constants/
│ ├─ hooks/
│ ├─ lib/
│ └─ middleware.ts
├─ .gitignore
├─ README.md
├─ next-env.d.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
└─ tsconfig.json
```


