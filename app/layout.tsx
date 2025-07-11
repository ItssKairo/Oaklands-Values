import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import { Providers } from './components/Providers';
import DisclaimerPopup from './components/DisclaimerPopup';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oaklands Stock Market",
  description: "Track stock values in the Oaklands economy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] flex flex-col min-h-screen`}
      >
        <Providers>
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
          <DisclaimerPopup />
        </Providers>
      </body>
    </html>
  );
}
