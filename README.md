# VedaEdutech — Production Web Platform

A full production-ready Next.js 14 application for VedaEdutech: a premium marketing website,
6 working lead/enrollment forms, role-based authentication (Admin / Teacher / Student), and a
full admin CRM with course, gallery, and blog content management.

## Tech Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · GSAP · MongoDB Atlas +
Mongoose · NextAuth.js · React Hook Form + Zod · React Query · UploadThing · Resend · react-quill

## 1. Install dependencies

```bash
npm install
```

## 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Then fill in `.env.local`. See the comments in that file for where to get each value. At minimum,
`MONGODB_URI` and `NEXTAUTH_SECRET` are required for the app to start. `UPLOADTHING_SECRET` /
`UPLOADTHING_APP_ID` are required for gallery/blog image uploads and resume uploads to work.
`RESEND_API_KEY` is required for password-reset emails to actually send (without it, reset links
are printed to the server console instead — fine for local development).

## 3. Seed demo accounts

Creates one Admin, one Teacher, and one Student account in your database:

```bash
npm run seed
```

Demo credentials (also shown on each login page):

| Role    | Email                     | Password     |
|---------|---------------------------|--------------|
| Admin   | admin@vedaedutech.in      | Admin@123    |
| Teacher | teacher@vedaedutech.in    | Teacher@123  |
| Student | student@vedaedutech.in    | Student@123  |

**Change these passwords (or delete and recreate the accounts) before going to production.**

## 4. Run locally

```bash
npm run dev
```

Visit http://localhost:3000

## 5. Build for production

```bash
npm run build
npm start
```

## 6. Deploy to Vercel

1. Push this project to a GitHub repository.
2. Import the repository in Vercel.
3. Add every variable from `.env.local` to the Vercel project's Environment Variables settings.
4. Set `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` to your production domain.
5. Deploy. Run `npm run seed` locally against your production `MONGODB_URI` once to create the
   initial admin account (or create one directly in MongoDB Atlas).

## Project Structure

```
app/                  Routes (App Router) — marketing pages, auth pages, dashboards, API routes
components/           UI, layout, forms, animations, dashboard, and page-specific components
lib/                  Mongoose models, validation schemas, auth config, utilities, seed content
scripts/seed.mjs      One-time script to create demo Admin/Teacher/Student accounts
types/                NextAuth type augmentation
public/                Static assets — icons, generated OG image, manifest
```

## Notes on the Logo

The current logo mark (navbar, footer, login screens, loading screen, favicon) is a placeholder
rebuilt from the official VedaEdutech reference image (open book + two children silhouettes,
orange/purple/pink/green palette) since the real logo file was not successfully received as an
uploadable asset during development. To swap in the real logo:

1. Replace `public/images/logo.png` with the real logo file.
2. Replace `public/favicon.ico`, `public/apple-touch-icon.png`, and the files in
   `public/images/icon-*.png` with real exports of the logo at those sizes.
3. Optionally simplify `components/ui/Logo.tsx` to render an `<Image>` of the real file instead
   of the inline SVG mark.

## Notes on Content

All course, testimonial, timeline, and blog content is realistic placeholder content written
specifically for VedaEdutech's stated business (CSP centers across Haryana/UP/Bihar) — not Lorem
Ipsum. Replace with real figures/testimonials/blog posts via the Admin dashboard (`/dashboard/admin`)
or by editing `lib/site-content.ts`, `lib/blog-seed.ts`, and `lib/gallery-seed.ts`.

## Known Limitations / Next Steps

- Course, Gallery, and Blog pages fall back to seed data (`lib/site-content.ts`, `lib/blog-seed.ts`,
  `lib/gallery-seed.ts`) until real records exist in MongoDB — add real ones via the Admin CRM.
- Student/Teacher dashboards show illustrative schedule/progress data since there is no
  enrollment/attendance backend yet — the course, gallery, blog, and CRM management systems are
  fully wired to MongoDB and production-ready.
- This project was built and statically verified (import resolution, brace/paren balance, "use
  client" directive coverage, dependency coverage) in an environment without npm registry access,
  so `npm install` / `npm run build` have not been executed by the assistant. Please run both
  locally and report any errors — the codebase has been carefully hand-reviewed to minimize the
  chance of issues, but this is not a substitute for an actual compiler run.
