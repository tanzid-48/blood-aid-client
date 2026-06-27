import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: " PUB Blood Aid | University Blood Aid Organization",
    template: "%s | Blood Aid",
  },
  description:
    "University Blood Aid Organization — Connecting donors, volunteers, and those in need. Save lives through the gift of blood.",
  keywords: [
    "blood donation",
    "blood bank",
    "university",
    "volunteers",
    "donors",
  ],
  authors: [{ name: "Blood Aid Organization" }],
  openGraph: {
    title: "Blood Aid | University Blood Aid Organization",
    description: "Connecting donors, volunteers, and those in need.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
