import type { Metadata } from "next";
import { Josefin_Sans, Outfit, Plus_Jakarta_Sans, JetBrains_Mono, Julius_Sans_One } from "next/font/google";
import "./globals.css";

const juliusSansOne = Julius_Sans_One({
  subsets: ["latin"],
  variable: "--font-julius",
  display: "swap",
  weight: ["400"],
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Hi, I'm Mastan Vali — 3D Creator · Data Architect · AI Builder",
  description:
    "Software engineer & 3D creator. Enterprise data engineering (SAP BODS, ETL, Production Support) and intelligent AI products. AnPharmacy, AnsiQ, Anasify, Qode-Sync.",
  keywords: [
    "Shaik Mastan Vali",
    "Mastan Vali",
    "3D Creator",
    "Software Engineer",
    "SAP BODS Developer",
    "AI Builder",
    "ETL Developer",
    "Portfolio",
  ],
  authors: [{ name: "Shaik Mastan Vali" }],
  creator: "Shaik Mastan Vali",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${josefinSans.variable} ${juliusSansOne.variable} ${outfit.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link
          rel="preload"
          href="/fonts/Warpaint.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-[#07090E] text-[#F8FAFC] font-sans antialiased overflow-x-clip selection:bg-[#E06D20]/25 selection:text-[#FFFFFF]">
        {children}
      </body>
    </html>
  );
}
