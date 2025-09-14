import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Provider } from "jotai";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "InsightPress",
    template: "%s | InsightPress",
  },
  description:
    "InsightPress is your go-to platform for insightful articles, news, and perspectives on technology, innovation, and modern life.",
  authors: [
    {
      name: "Bashombe Parfait",
      url: "https://github.com/parfaitBashombe",
    },
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-100 h-full`}
      >
        <Provider>
          {/* Flex wrapper fills viewport */}
          <div className="flex flex-col min-h-screen">
            <Navbar />

            {/* Main content grows to push footer down */}
            <main className="flex-1">
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>

            {/* Footer always at bottom */}
            <Footer />
          </div>

          <Toaster
            position="top-center"
            expand
            richColors
            closeButton
            visibleToasts={5}
          />
        </Provider>
        <Analytics />
      </body>
    </html>
  );
}
