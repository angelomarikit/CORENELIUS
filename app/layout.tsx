import type { Metadata } from "next";
import { Newsreader, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.coreneliusconstruction.com"),
  title: {
    default: "Corenelius Technologies & Construction Inc.",
    template: "%s · Corenelius",
  },
  description:
    "Philippine sewage treatment and construction company. Advanced Oxidation Process plants, design-build works, and DAO 2021-19 compliance.",
  openGraph: {
    title: "Corenelius Technologies & Construction Inc.",
    description:
      "Sewage treatment plants, infrastructure, and integrated construction, led by a licensed sanitary engineer.",
    images: ["/media/hero-river.jpg"],
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${newsreader.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
