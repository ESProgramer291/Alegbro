import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alegbro - Learn Math Like a Game",
  description: "Master algebra through gamified learning with AI guidance",
  keywords: ["algebra", "learning", "gamification", "education", "AI"],
  authors: [{ name: "Alegbro Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alegbro.com",
    title: "Alegbro - Learn Math Like a Game",
    description: "Master algebra through gamified learning with AI guidance",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
