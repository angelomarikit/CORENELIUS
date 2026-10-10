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
    url: "https://www.coreneliusconstruction.com",
    siteName: "Corenelius Technologies & Construction Inc.",
    images: [
      {
        url: "/media/og.png",
        width: 1200,
        height: 630,
        alt: "Corenelius Technologies and Construction, Inc.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Corenelius Technologies & Construction Inc.",
    description:
      "Sewage treatment plants, infrastructure, and integrated construction, led by a licensed sanitary engineer.",
    images: ["/media/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${newsreader.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
