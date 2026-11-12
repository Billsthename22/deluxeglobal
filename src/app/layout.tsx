import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "Deluxe Global | Perfume Oils, Surprise Gifts & Girly Essentials",
  description: "Your little world of Deluxe: undiluted perfume oils, thoughtful surprise gifts, and beauty, accessories, and everyday girly essentials. Shop the collections or build a personal gift.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
