import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "../../components/Navbar";
import { ProProvider } from "../context/ProContext";
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
  title: "ToneKit",
  description: "ToneKit – your source for high-quality audio plugins and synths",
  keywords: ["audio", "plugin", "synth", "guitar", "tone"],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex-1`}>
        <ProProvider>
          <Navbar />
          <main className="px-4">{children}</main>
        </ProProvider>
      </body>
    </html>
  );
}
