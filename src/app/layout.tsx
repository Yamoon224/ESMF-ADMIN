import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "ESMF Admin — Dashboard",
  description:
    "Dashboard d'administration ESMF (Enagnon Sécurité Mobilité Femme) — supervision temps réel, utilisatrices, conductrices, incidents SOS, analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-esmf-bg text-esmf-text">{children}</body>
    </html>
  );
}
