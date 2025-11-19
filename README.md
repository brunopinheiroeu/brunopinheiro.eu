This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

This project has **two** servers:

- A Next.js frontend in the repository root
- A Strapi CMS backend under `backend/`

You need both running locally to view live project data.

### 1. Start the Strapi backend

```bash
cd backend
npm install          # first run only
npm run develop      # starts Strapi on http://localhost:1337
```

Once Strapi is running:
- **Admin Panel**: Open [http://localhost:1337/admin](http://localhost:1337/admin) in your browser
- **API**: Available at [http://localhost:1337/api](http://localhost:1337/api)

> The first boot will ask you to create an admin user. After logging in, you can create/edit `Products` content types in the admin panel.

Optional: seed demo products

```bash
cd backend
npm run seed:projects   # runs scripts/seed-projects.js
```

### 2. Start the Next.js frontend

From the repository root:

```bash
npm install          # first run only
npm run dev          # or yarn dev / pnpm dev / bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment variables

The frontend reads `NEXT_PUBLIC_STRAPI_URL` (defaults to `http://localhost:1337`). If your Strapi server runs elsewhere, create a `.env.local` at the repo root:

```
NEXT_PUBLIC_STRAPI_URL=http://your-strapi-host:port
```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
