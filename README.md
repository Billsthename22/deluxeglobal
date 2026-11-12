This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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

## Product administration

Copy `.env.example` to `.env.local`, set a long unique `ADMIN_PASSWORD`, and restart the development server. Visit `/admin` to sign in, upload a JPG/PNG/WebP photo (up to 5 MB), and create, edit, or delete products. Changes appear in `/Shop` and the home page. Checkout sends the order details and product prices to the existing Telegram contact for confirmation; it does not process payments.

Catalog records and photos live in `.data/` by default. Set `DATA_DIR` to a persistent writable directory for a self-hosted deployment and include it in backups. This filesystem backend is intended for a single Node server. Vercel/serverless or multiple app instances require a shared database and object storage before deploying product administration. The sample catalog is used until the first change is saved. Admin access stays disabled until the password is configured.
